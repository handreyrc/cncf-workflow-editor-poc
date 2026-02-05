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

import { switchExpression } from "@kie-tools-core/switch-expression-ts/src";
import { NodeType } from "../diagram/connections/graphStructure";
import { NODE_TYPES } from "../diagram/nodes/SwfNodeTypes";
import { NodeNature, nodeNatures } from "./NodeNature";
import { Specification, Classes } from "@serverlessworkflow/sdk";
import { toPlainObject } from "lodash";
import * as RF from "reactflow";

export function addStandaloneNode({
  definitions,
  newNode,
}: {
  definitions: Specification.Workflow;
  newNode: { type: NodeType; bounds: RF.Rect };
}) {
  let newTaskItem: Specification.TaskItem;
  const nature = nodeNatures[newNode.type];

  if (nature === NodeNature.SWF_TASK) {
    definitions.do ??= [] as unknown as Specification.TaskList;

    const s: Specification.TaskItem = {
      [`${getNextAvailableName("New CallTask", definitions.do, 0).name}`]: new Classes.CallTask(definitions),
    };

    newTaskItem = switchExpression(newNode.type as Exclude<NodeType, "node_unknown">, {
      [NODE_TYPES.CallTask]: {
        [`${getNextAvailableName("New CallTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.DoTask]: {
        [`${getNextAvailableName("New DoTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.EmitTask]: {
        [`${getNextAvailableName("New EmitTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.ForTask]: {
        [`${getNextAvailableName("New ForTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.ForkTask]: {
        [`${getNextAvailableName("New ForkTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.ListenTask]: {
        [`${getNextAvailableName("New ListenTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.RaiseTask]: {
        [`${getNextAvailableName("New RaiseTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.RunTask]: {
        [`${getNextAvailableName("New RunTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.SetTask]: {
        [`${getNextAvailableName("New SetTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.TryTask]: {
        [`${getNextAvailableName("New TryTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.WaitTask]: {
        [`${getNextAvailableName("New WaitTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
      [NODE_TYPES.SwitchTask]: {
        [`${getNextAvailableName("New SwitchTask", definitions.do, 0).name}`]: toPlainObject(
          new Classes.CallTask(definitions)
        ),
      },
    });

    definitions.do?.push(newTaskItem);
  } else {
    throw new Error(`Unknown node usage '${nature}'.`);
  }

  return Object.keys(newTaskItem)[0];
}

export function getNextAvailableName(
  name: string,
  tasks: Specification.TaskList,
  count: number
): { id: string; name: string } {
  if (!tasks || tasks.length === 0) {
    return { id: name, name };
  }
  tasks.forEach((taskItem) => {
    if (Object.keys(taskItem)[0] === name) {
      const index = name.lastIndexOf("_");
      if (index >= 0) {
        name = name.slice(0, index);
      }
      count++;
      name = getNextAvailableName(name + "_" + count, tasks, count).name;
    }
  });

  return { id: name, name };
}
