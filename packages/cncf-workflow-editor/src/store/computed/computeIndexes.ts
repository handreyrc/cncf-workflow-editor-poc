/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { State } from "../Store";
import { Specification } from "@serverlessworkflow/sdk";
import { SwfEdge, SwfEdgeTypes } from "../../diagram/graph/graph";
import { buildEdgeId } from "../../diagram/edges/useKieEdgePath";
import { getTaskTypeFromTaskItem } from "../../diagram/maths/SwfMaths";

export function computeIndexedSwf(definitions: State["swf"]["model"]) {
  const swfEdgesBySwfRef = new Map<string, SwfEdge & { index: number }>();
  const swfNodesByHref = new Map<string, Object & { index: number }>();

  const tasks = definitions.do;

  for (let i = 0; i < tasks.length; i++) {
    const taskItem = tasks[i];

    // SWFShape
    // Use state name as id once the spec 0.8 is based on unique state names
    swfNodesByHref.set(Object.keys(taskItem)[0], { ...taskItem, index: i });

    // SWFNode
    const taskEdges = buildSwfEdgesForNode(tasks, i);

    for (let j = 0; j < taskEdges.length; j++) {
      swfEdgesBySwfRef.set(taskEdges[j].id!, { ...taskEdges[j], index: swfEdgesBySwfRef.size });
    }
  }
  return {
    swfEdgesBySwfRef,
    swfNodesByHref,
  };
}

function buildSwfEdgesForNode(tasks: Specification.TaskList, index: number): SwfEdge[] {
  const edges: SwfEdge[] = [];
  const node = tasks[index];
  const nodeType = getTaskTypeFromTaskItem(node);

  switch (nodeType) {
    case "call":
    case "do":
    case "emit":
    case "for":
    case "fork":
    case "listen":
    case "raise":
    case "run":
    case "set":
    case "try":
    case "wait": {
      const transition = getTransition(index, tasks);

      if (transition) {
        edges.push(transition);
      }

      break;
    }

    case "switch": {
      getConditionTransitions(index, tasks).forEach((eventConditions) => edges.push(eventConditions));

      break;
    }
    default: {
      break;
    }
  }

  return edges;
}

function getTransition(index: number, tasks: Specification.TaskList): SwfEdge | undefined {
  const taskItem = tasks[index];
  const taskName = Object.keys(taskItem)[0];
  const task = taskItem[taskName];

  if (task.then !== undefined) {
    switch (task.then) {
      case "exit":
      case "end":
        return undefined;
      case "continue":
        break;
      default:
        return buildSwfEdge(index, taskItem, taskName, task.then, "transition");
    }
  }

  // solve implincit edge connection
  if (index + 1 < tasks.length) {
    const nextTaskName = Object.keys(tasks[index + 1])[0];

    return buildSwfEdge(index, taskItem, taskName, nextTaskName, "transition");
  }

  return undefined;
}

function getConditionTransitions(index: number, tasks: Specification.TaskList): SwfEdge[] {
  const conditionTransitions: SwfEdge[] = [];
  const taskItem = tasks[index];
  const taskName = Object.keys(taskItem)[0];
  const conditions = (taskItem[Object.keys(taskItem)[0]] as Specification.SwitchTask).switch!;

  conditions.forEach((condition) => {
    const switchItem = Object.keys(condition)[0];
    const switchCase = condition[switchItem];

    if (switchItem === "default") {
      conditionTransitions.push(buildSwfEdge(index, taskItem, taskName, switchCase.then, "default"));
    } else {
      conditionTransitions.push(buildSwfEdge(index, taskItem, taskName, switchCase.then, "condition"));
    }
  });

  return conditionTransitions;
}

function buildSwfEdge(
  index: number,
  node: Specification.TaskItem,
  source: string,
  target: string,
  type: SwfEdgeTypes
): SwfEdge {
  return {
    sourceId: source,
    targetId: target,
    id: buildEdgeId(source, target, type),
    swfObject: {
      id: Object.keys(node)[0],
      type: getTaskTypeFromTaskItem(node),
      edgeType: type,
      index: index,
    },
  };
}
