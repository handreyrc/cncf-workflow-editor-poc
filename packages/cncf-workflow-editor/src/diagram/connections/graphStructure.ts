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

import { NODE_TYPES } from "../nodes/SwfNodeTypes";
import { EDGE_TYPES } from "../edges/SwfEdgeTypes";

type Values<T> = T[keyof T];

export type NodeType = Values<typeof NODE_TYPES>;
export type EdgeType = Values<typeof EDGE_TYPES>;

// All outgoing connetions are allowed for all nodes for now
export const graphStructure: Map<NodeType, Map<EdgeType, Set<NodeType>>> = new Map([
  [
    NODE_TYPES.CallTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.DoTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.EmitTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.ForTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.ForkTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.ListenTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.RaiseTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.RaiseTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.RunTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.SetTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.SwitchTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.condition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
      [
        EDGE_TYPES.default,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.TryTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
  [
    NODE_TYPES.WaitTask,
    new Map<EdgeType, Set<NodeType>>([
      [
        EDGE_TYPES.transition,
        new Set([
          NODE_TYPES.CallTask,
          NODE_TYPES.DoTask,
          NODE_TYPES.EmitTask,
          NODE_TYPES.ForTask,
          NODE_TYPES.ForkTask,
          NODE_TYPES.ListenTask,
          NODE_TYPES.RaiseTask,
          NODE_TYPES.RunTask,
          NODE_TYPES.SetTask,
          NODE_TYPES.SwitchTask,
          NODE_TYPES.TryTask,
          NODE_TYPES.WaitTask,
        ]),
      ],
    ]),
  ],
]);

export const outgoingStructure = {
  [NODE_TYPES.CallTask]: {
    nodes: outgoingNodes(NODE_TYPES.CallTask),
    edges: outgoingEdges(NODE_TYPES.CallTask),
  },
  [NODE_TYPES.DoTask]: {
    nodes: outgoingNodes(NODE_TYPES.DoTask),
    edges: outgoingEdges(NODE_TYPES.DoTask),
  },
  [NODE_TYPES.EmitTask]: {
    nodes: outgoingNodes(NODE_TYPES.EmitTask),
    edges: outgoingEdges(NODE_TYPES.EmitTask),
  },
  [NODE_TYPES.ForTask]: {
    nodes: outgoingNodes(NODE_TYPES.ForTask),
    edges: outgoingEdges(NODE_TYPES.ForTask),
  },
  [NODE_TYPES.ForkTask]: {
    nodes: outgoingNodes(NODE_TYPES.ForkTask),
    edges: outgoingEdges(NODE_TYPES.ForkTask),
  },
  [NODE_TYPES.ListenTask]: {
    nodes: outgoingNodes(NODE_TYPES.ListenTask),
    edges: outgoingEdges(NODE_TYPES.ListenTask),
  },
  [NODE_TYPES.RaiseTask]: {
    nodes: outgoingNodes(NODE_TYPES.RaiseTask),
    edges: outgoingEdges(NODE_TYPES.RaiseTask),
  },
  [NODE_TYPES.RunTask]: {
    nodes: outgoingNodes(NODE_TYPES.RunTask),
    edges: outgoingEdges(NODE_TYPES.RunTask),
  },
  [NODE_TYPES.SetTask]: {
    nodes: outgoingNodes(NODE_TYPES.SetTask),
    edges: outgoingEdges(NODE_TYPES.SetTask),
  },
  [NODE_TYPES.SwitchTask]: {
    nodes: outgoingNodes(NODE_TYPES.SwitchTask),
    edges: outgoingEdges(NODE_TYPES.SwitchTask),
  },
  [NODE_TYPES.TryTask]: {
    nodes: outgoingNodes(NODE_TYPES.TryTask),
    edges: outgoingEdges(NODE_TYPES.TryTask),
  },
  [NODE_TYPES.WaitTask]: {
    nodes: outgoingNodes(NODE_TYPES.WaitTask),
    edges: outgoingEdges(NODE_TYPES.WaitTask),
  },
};

export const containment = new Map<NodeType, Set<NodeType>>([
  // Containment is not supported for now keeping the settings
  //[NODE_TYPES.somenode, new Set([NODE_TYPES.some node])],
]);

function outgoingNodes(srcNodeType: NodeType): NodeType[] {
  // FIXME : Duplicates are causing issues in edit mode because we have all edges x all nodes combination
  // Probably the best approach is to return possible nodes connections filtered by edge type.
  // return Array.from((graphStructure.get(srcNodeType) ?? new Map()).values()).flatMap((tgt) => [...tgt]);
  return [
    NODE_TYPES.CallTask,
    NODE_TYPES.DoTask,
    NODE_TYPES.EmitTask,
    NODE_TYPES.ForTask,
    NODE_TYPES.ForkTask,
    NODE_TYPES.ListenTask,
    NODE_TYPES.RaiseTask,
    NODE_TYPES.RunTask,
    NODE_TYPES.SetTask,
    NODE_TYPES.SwitchTask,
    NODE_TYPES.TryTask,
    NODE_TYPES.WaitTask,
  ];
}
function outgoingEdges(srcNodeType: NodeType): EdgeType[] {
  return Array.from((graphStructure.get(srcNodeType) ?? new Map()).keys());
}

export function getDefaultEdgeTypeBetween(source: NodeType, target: NodeType): EdgeType | undefined {
  const edges = getEdgeTypesBetween(source, target);
  if (edges.length > 1) {
    console.debug(
      `Multiple edges possible for ${source} --> ${target}. Choosing first one in structure definition: ${edges[0]}.`
    );
  }

  return edges[0];
}

export function getEdgeTypesBetween(source: NodeType, target: NodeType): EdgeType[] {
  const sourceStructure = graphStructure.get(source);
  if (!sourceStructure) {
    return [];
  }

  const possibleEdges: EdgeType[] = [];
  for (const [e, t] of [...sourceStructure.entries()]) {
    if (t.has(target)) {
      possibleEdges.push(e);
    }
  }

  return possibleEdges;
}
