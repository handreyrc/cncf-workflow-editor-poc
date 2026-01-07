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

import { SnapGrid } from "../../store/Store";
import { snapPoint } from "../SnapGrid";
import { NodeType } from "../connections/graphStructure";
import { NODE_TYPES } from "./SwfNodeTypes";
import * as RF from "reactflow";

export type NodeSizes<T extends NodeType = NodeType> = {
  [K in T]: (args: { snapGrid: SnapGrid }) => RF.Dimensions;
};

export const MIN_NODE_SIZES: NodeSizes = {
  [NODE_TYPES.CallTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.DoTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.EmitTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ForTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ForkTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ListenTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.RaiseTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.RunTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.SetTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.SwitchTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.TryTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.WaitTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.unknown]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
};

export const DEFAULT_NODE_SIZES: NodeSizes = {
  [NODE_TYPES.CallTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.DoTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.EmitTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ForTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ForkTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.ListenTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.RaiseTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.RunTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.SetTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.SwitchTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.TryTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.WaitTask]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
  [NODE_TYPES.unknown]: ({ snapGrid }) => {
    const snappedMinSize = MIN_SIZE_FOR_NODES(snapGrid);
    return {
      width: snappedMinSize.width,
      height: snappedMinSize.height,
    };
  },
};

// Default node sizes
export const NODE_MIN_WIDTH = 200;
export const NODE_MIN_HEIGHT = 70;

const MIN_SIZE_FOR_NODES = (grid: SnapGrid, width = NODE_MIN_WIDTH, height = NODE_MIN_HEIGHT) => {
  const snapped = snapPoint(grid, { x: width, y: height }, "ceil");
  return { width: snapped["x"], height: snapped["y"] };
};
