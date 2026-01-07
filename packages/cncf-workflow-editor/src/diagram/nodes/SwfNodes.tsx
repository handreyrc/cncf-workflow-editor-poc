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

import { Specification } from "@serverlessworkflow/sdk";
import * as React from "react";
import { useCallback, useLayoutEffect, useMemo, useRef } from "react";
import * as RF from "reactflow";
import { renameElement } from "../../mutations/renameNode";
import { useSwfEditorStore, useSwfEditorStoreApi } from "../../store/StoreContext";
import { PositionalNodeHandles } from "../connections/PositionalNodeHandles";
import { NodeType, containment, outgoingStructure } from "../connections/graphStructure";
import { EDGE_TYPES } from "../edges/SwfEdgeTypes";
import { useIsHovered } from "../useIsHovered";
import { DEFAULT_NODE_SIZES } from "./SwfDefaultSizes";
import { EditableNodeLabel, OnEditableNodeLabelChange, useEditableNodeLabel } from "./EditableNodeLabel";
import { getNodeLabelPosition } from "./NodeStyle";
import {
  CallTaskSvg,
  DoTaskSvg,
  ForkTaskSvg,
  EmitTaskSvg,
  ForTaskSvg,
  ListenTaskSvg,
  RaiseTaskSvg,
  RunTaskSvg,
  SetTaskSvg,
  SwitchTaskSvg,
  TryTaskSvg,
  WaitTaskSvg,
  UnknownNodeSvg,
} from "./SwfNodeSvgs";
import { NODE_TYPES } from "./SwfNodeTypes";
import { OutgoingStuffNodePanel } from "./OutgoingStuffNodePanel";
import { propsHaveSameValuesDeep } from "../memoization/memoization";

export type ElementFilter<E extends { __$$element: string }, Filter extends string> = E extends any
  ? E["__$$element"] extends Filter
    ? E
    : never
  : never;

export type NodeSwfObjects = null | Specification.TaskItem;

export type NodeSwfObjectsType =
  | "call"
  | "do"
  | "emit"
  | "for"
  | "fork"
  | "listen"
  | "raise"
  | "run"
  | "set"
  | "switch"
  | "try"
  | "wait"
  | "unknown";

export type SwfDiagramNodeData<T extends NodeSwfObjects = NodeSwfObjects> = {
  swfObject: T;
  index: number;
  /**
   * We don't use Reactflow's parenting mechanism because it is
   * too opinionated on how it deletes nodes/edges that are
   * inside/connected to nodes with parents
   * */
  parentRfNode: RF.Node<SwfDiagramNodeData> | undefined;
};

// Unknown
export const UnknownNode = React.memo(
  ({ data: { index }, selected, dragging, zIndex, type, id }: RF.NodeProps<SwfDiagramNodeData<null>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.unknown]({ snapGrid });

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className}`}>
          <UnknownNodeSvg {...nodeDimensions} x={0} y={0} />
        </svg>

        <RF.Handle key={"unknown"} id={"unknown"} type={"source"} style={{ opacity: 0 }} position={RF.Position.Top} />

        <div
          ref={ref}
          className={`kie-swf-editor--node kie-swf-editor--unknown-node ${className}`}
          tabIndex={-1}
          data-nodehref={id}
        >
          {/* {`render count: ${renderCount.current}`}
          <br /> */}
          <EditableNodeLabel
            id={id}
            namedElement={undefined}
            position={getNodeLabelPosition({ nodeType: type as typeof NODE_TYPES.unknown })}
            isEditing={false}
            setEditing={() => {}}
            value={`? `}
            onChange={() => {}}
            skipValidation={false}
            shouldCommitOnBlur={true}
          />
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.CallTask;
export const CallTask = React.memo(
  ({
    data: { swfObject: callTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "CallTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.CallTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <CallTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(callTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.CallTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.CallTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={callTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.CallTask,
                })}
                value={Object.keys(callTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.DoTask;
export const DoTask = React.memo(
  ({
    data: { swfObject: doTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "DoTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.DoTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <DoTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(doTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.DoTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.DoTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={doTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.DoTask,
                })}
                value={Object.keys(doTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.EmitTask;
export const EmitTask = React.memo(
  ({
    data: { swfObject: emitTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "EmitTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.EmitTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <EmitTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(emitTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.EmitTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.EmitTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={emitTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.EmitTask,
                })}
                value={Object.keys(emitTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.ForTask;
export const ForTask = React.memo(
  ({
    data: { swfObject: forTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "ForTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.ForTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <ForTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(forTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.ForTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.ForTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={forTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.ForTask,
                })}
                value={Object.keys(forTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.ForkTask;
export const ForkTask = React.memo(
  ({
    data: { swfObject: forkTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "ForkTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.ForkTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <ForkTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(forkTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.ForkTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.ForkTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={forkTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.ForkTask,
                })}
                value={Object.keys(forkTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.ListenTask;
export const ListenTask = React.memo(
  ({
    data: { swfObject: listenTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "ListenTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.ListenTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <ListenTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(listenTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.ListenTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.ListenTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={listenTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.ListenTask,
                })}
                value={Object.keys(listenTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.RaiseTask;
export const RaiseTask = React.memo(
  ({
    data: { swfObject: raiseTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "RaiseTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.RaiseTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <RaiseTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(raiseTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.RaiseTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.RaiseTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={raiseTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.RaiseTask,
                })}
                value={Object.keys(raiseTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.RunTask;
export const RunTask = React.memo(
  ({
    data: { swfObject: runTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "RunTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.RunTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <RunTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(runTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.RunTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.RunTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={runTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.RunTask,
                })}
                value={Object.keys(runTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.SetTask;
export const SetTask = React.memo(
  ({
    data: { swfObject: setTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "SetTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.SetTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <SetTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(setTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.SetTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.SetTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={setTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.SetTask,
                })}
                value={Object.keys(setTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.SwitchTask;
export const SwitchTask = React.memo(
  ({
    data: { swfObject: switchTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "SwitchTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.SwitchTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <SwitchTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(switchTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.SwitchTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.SwitchTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={switchTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.SwitchTask,
                })}
                value={Object.keys(switchTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.TryTask;
export const TryTask = React.memo(
  ({
    data: { swfObject: tryTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "TryTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.TryTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <TryTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(tryTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.TryTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.TryTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={tryTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.TryTask,
                })}
                value={Object.keys(tryTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

//Specification.WaitTask;
export const WaitTask = React.memo(
  ({
    data: { swfObject: waitTask, index, parentRfNode },
    selected,
    dragging,
    zIndex,
    type,
    id,
  }: RF.NodeProps<SwfDiagramNodeData<Specification.TaskItem & { __$$element: "WaitTask" }>>) => {
    const ref = useRef<HTMLDivElement>(null);

    const snapGrid = useSwfEditorStore((s) => s.diagram.snapGrid);
    const isHovered = useIsHovered(ref);
    const shouldActLikeHovered = useSwfEditorStore((s) => isHovered && s.diagram.draggingNodes.length === 0);

    const { isEditingLabel, setEditingLabel, triggerEditing, triggerEditingIfEnter } = useEditableNodeLabel(id);
    useHoveredNodeAlwaysOnTop(ref, zIndex, shouldActLikeHovered, dragging, selected, isEditingLabel);

    const swfEditorStoreApi = useSwfEditorStoreApi();

    const { isTargeted, isValidConnectionTarget } = useConnectionTargetStatus(id, shouldActLikeHovered);
    const className = useNodeClassName(isValidConnectionTarget, id);

    // use default node sizes
    const nodeDimensions = DEFAULT_NODE_SIZES[NODE_TYPES.WaitTask]({ snapGrid });

    const setName = useCallback<OnEditableNodeLabelChange>(
      (newName: string) => {
        swfEditorStoreApi.setState((state) => {
          renameElement({ definitions: state.swf.model.do, newName, index });
        });
      },
      [swfEditorStoreApi, index]
    );

    return (
      <>
        <svg className={`kie-swf-editor--node-shape ${className} ${selected ? "selected" : ""}`}>
          {
            <WaitTaskSvg
              {...nodeDimensions}
              x={0}
              y={0}
              strokeWidth={undefined}
              fillColor={undefined}
              strokeColor={undefined}
            />
          }
        </svg>
        <PositionalNodeHandles isTargeted={isTargeted && isValidConnectionTarget} nodeId={id} />
        <div
          onDoubleClick={triggerEditing}
          onKeyDown={triggerEditingIfEnter}
          className={`kie-swf-editor--generic-node ${className}`}
          ref={ref}
          tabIndex={-1}
          data-nodehref={id}
          data-nodelabel={Object.keys(waitTask)[0]}
        >
          <div className={`kie-swf-editor--node `}>
            <OutgoingStuffNodePanel
              nodeHref={id}
              isVisible={false}
              nodeTypes={outgoingStructure[NODE_TYPES.WaitTask].nodes}
              edgeTypes={outgoingStructure[NODE_TYPES.WaitTask].edges}
            />
            {
              <EditableNodeLabel
                id={id}
                namedElement={waitTask}
                isEditing={isEditingLabel}
                setEditing={setEditingLabel}
                position={getNodeLabelPosition({
                  nodeType: type as typeof NODE_TYPES.WaitTask,
                })}
                value={Object.keys(waitTask)[0]}
                onChange={setName}
                shouldCommitOnBlur={true}
              />
            }
          </div>
        </div>
      </>
    );
  },
  propsHaveSameValuesDeep
);

///

export function EmptyLabel() {
  return (
    <span style={{ fontFamily: "serif" }}>
      <i style={{ opacity: 0.8 }}>{`<Empty>`}</i>
      <br />
      <i style={{ opacity: 0.5, fontSize: "0.8em", lineHeight: "0.8em" }}>{`Double-click to name`}</i>
    </span>
  );
}

function useHoveredNodeAlwaysOnTop(
  ref: React.RefObject<HTMLDivElement | SVGElement>,
  zIndex: number,
  shouldActLikeHovered: boolean,
  dragging: boolean,
  selected: boolean,
  isEditing: boolean
) {
  useLayoutEffect(() => {
    const r = ref.current;

    if (selected && !isEditing) {
      r?.focus();
    }
  }, [dragging, shouldActLikeHovered, ref, zIndex, selected, isEditing]);
}

export function useConnection(nodeId: string) {
  const connectionNodeId = RF.useStore((s) => s.connectionNodeId);
  const connectionHandleType = RF.useStore((s) => s.connectionHandleType);

  const source = connectionNodeId;
  const target = nodeId;

  const edgeIdBeingUpdated = useSwfEditorStore((s) => s.diagram.edgeIdBeingUpdated);
  const sourceHandle = RF.useStore(
    (s) => s.connectionHandleId ?? s.edges.find((e) => e.id === edgeIdBeingUpdated)?.type ?? null
  );

  const connection = useMemo(
    () => ({
      source: connectionHandleType === "source" ? source : target,
      target: connectionHandleType === "source" ? target : source,
      sourceHandle,
      targetHandle: null, // We don't use targetHandles, as target handles are only different in position, not in semantic.
    }),
    [connectionHandleType, source, sourceHandle, target]
  );

  return connection;
}

export function useConnectionTargetStatus(nodeId: string, shouldActLikeHovered: boolean) {
  const isTargeted = RF.useStore((s) => !!s.connectionNodeId && s.connectionNodeId !== nodeId && shouldActLikeHovered);
  const connection = useConnection(nodeId);
  const isValidConnectionTarget = RF.useStore((s) => s.isValidConnection?.(connection) ?? false);

  return useMemo(
    () => ({
      isTargeted,
      isValidConnectionTarget,
    }),
    [isTargeted, isValidConnectionTarget]
  );
}

export function useNodeClassName(isValidConnectionTarget: boolean, nodeId: string) {
  const isDropTarget = useSwfEditorStore(
    (s) => s.diagram.dropTargetNode?.id === nodeId && containment.get(s.diagram.dropTargetNode?.type as NodeType)
  );
  const isDropTargetNodeValidForSelection = useSwfEditorStore((s) => s.computed(s).isDropTargetNodeValidForSelection());
  const isConnectionNodeId = RF.useStore((s) => s.connectionNodeId === nodeId);
  const connection = useConnection(nodeId);
  const isEdgeConnection = !!Object.values(EDGE_TYPES).find((s) => s === connection.sourceHandle);
  const isNodeConnection = !!Object.values(NODE_TYPES).find((s) => s === connection.sourceHandle);

  if (isNodeConnection && !isConnectionNodeId) {
    return "dimmed";
  }

  if (isEdgeConnection && (!isValidConnectionTarget || isConnectionNodeId)) {
    return "dimmed";
  }

  if (isDropTarget) {
    return isDropTargetNodeValidForSelection ? "drop-target" : "drop-target-invalid";
  }

  return "normal";
}
