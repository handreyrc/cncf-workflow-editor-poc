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

import * as React from "react";
import * as RF from "reactflow";
import { ConditionPath, DefaultPath, SwfDiagramEdgeData, TransitionPath } from "../diagram/edges/SwfEdges";
import { SwfDiagramNodeData } from "../diagram/nodes/SwfNodes";
import { SnapGrid, State } from "../store/Store";
import { EdgeMarkers } from "../diagram/edges/EdgeMarkers";
import { EDGE_TYPES } from "../diagram/edges/SwfEdgeTypes";
import { getSnappedMultiPointAnchoredEdgePath } from "../diagram/edges/getSnappedMultiPointAnchoredEdgePath";
import {
  CallTaskSvg,
  DoTaskSvg,
  EmitTaskSvg,
  ForTaskSvg,
  ForkTaskSvg,
  ListenTaskSvg,
  RaiseTaskSvg,
  RunTaskSvg,
  SetTaskSvg,
  SwitchTaskSvg,
  TryTaskSvg,
  WaitTaskSvg,
  UnknownNodeSvg,
  NodeLabelPosition,
} from "../diagram/nodes/SwfNodeSvgs";
import { NODE_TYPES } from "../diagram/nodes/SwfNodeTypes";
import { useMemo } from "react";
import {
  assertUnreachable,
  getNodeLabelPosition,
  getNodeStyle,
  DEFAULT_NODE_FILL,
  DEFAULT_NODE_STROKE_COLOR,
  DEFAULT_FONT_STYLE,
} from "../diagram/nodes/NodeStyle";
import { NodeType } from "../diagram/connections/graphStructure";
import { Text } from "@visx/text";
import { useSwfEditorStore } from "../store/StoreContext";

export function SwfDiagramSvg({
  nodes,
  edges,
  snapGrid,
  thisSwf,
}: {
  nodes: RF.Node<SwfDiagramNodeData>[];
  edges: RF.Edge<SwfDiagramEdgeData>[];
  snapGrid: SnapGrid;
  thisSwf: State["swf"];
}) {
  const { nodesSvg, nodesById } = useMemo(() => {
    const nodesById = new Map<string, RF.Node<SwfDiagramNodeData>>();

    const nodesSvg = nodes.map((node) => {
      const { fontCssProperties: fontStyle, shapeStyle } = getNodeStyle({
        fillColor: DEFAULT_NODE_FILL, // using default fill color
        strokeColor: DEFAULT_NODE_STROKE_COLOR, // using default fill color
        swfFontStyle: DEFAULT_FONT_STYLE, // using default font stype
      });

      nodesById.set(node.id, node);

      const { height, width, ...style } = node.style!;

      //Name is mandatory
      const label = Object.keys(node.data!.swfObject!)[0];

      return (
        <g data-kie-swf-node-id={node.id} key={node.id}>
          {node.type === NODE_TYPES.CallTask && (
            <CallTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.DoTask && (
            <DoTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.EmitTask && (
            <EmitTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.ForTask && (
            <ForTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.ForkTask && (
            <ForkTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.ListenTask && (
            <ListenTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.RaiseTask && (
            <RaiseTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.RunTask && (
            <RunTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.SetTask && (
            <SetTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.SwitchTask && (
            <SwitchTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.TryTask && (
            <TryTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.WaitTask && (
            <WaitTaskSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...shapeStyle}
            />
          )}
          {node.type === NODE_TYPES.unknown && (
            <UnknownNodeSvg
              width={node.width!}
              height={node.height!}
              x={node.positionAbsolute!.x}
              y={node.positionAbsolute!.y}
              {...style}
              {...(shapeStyle as any)}
            />
          )}
          <>
            {label.split("\n").map((labelLine, i) => (
              <Text
                key={i}
                lineHeight={fontStyle.lineHeight}
                style={{ ...fontStyle }}
                dy={`calc(1.5em * ${i})`}
                {...getNodeLabelSvgTextAlignmentProps(node, getNodeLabelPosition({ nodeType: node.type as NodeType }))}
              >
                {labelLine}
              </Text>
            ))}
          </>
        </g>
      );
    });

    return { nodesSvg, nodesById };
  }, [nodes]);

  const edgeIds = useSwfEditorStore((s) => s.diagram.edgeIds);
  const edgeWaypoints = useSwfEditorStore((s) => s.diagram.edgeWaypoints);

  return (
    <>
      <EdgeMarkers />
      {edges.map((e) => {
        const s = nodesById?.get(e.source);
        const t = nodesById?.get(e.target);
        const i = edgeIds.indexOf(e.data!.swfObject.id!);
        const { path } = getSnappedMultiPointAnchoredEdgePath({
          snapGrid,
          waypoints: edgeWaypoints[i],
          swfEdge: e.data!.swfEdge,
          sourceNodeBounds: {
            x: s?.positionAbsolute?.x,
            y: s?.positionAbsolute?.y,
            width: s?.width,
            height: s?.height,
          },
          targetNodeBounds: {
            x: t?.positionAbsolute?.x,
            y: t?.positionAbsolute?.y,
            width: t?.width,
            height: t?.height,
          },
        });
        return (
          <React.Fragment key={e.id}>
            {e.type === EDGE_TYPES.condition && <ConditionPath d={path} />}
            {e.type === EDGE_TYPES.default && <DefaultPath d={path} />}
            {e.type === EDGE_TYPES.transition && <TransitionPath d={path} />}
          </React.Fragment>
        );
      })}
      {nodesSvg}
    </>
  );
}

const SVG_NODE_LABEL_TEXT_PADDING_ALL = 10;
const SVG_NODE_LABEL_TEXT_ADDITIONAL_PADDING_TOP_LEFT = 8;

export function getNodeLabelSvgTextAlignmentProps(n: RF.Node<SwfDiagramNodeData>, labelPosition: NodeLabelPosition) {
  switch (labelPosition) {
    case "center-bottom":
      const cbTx = n.position.x! + n.width! / 2;
      const cbTy = n.position.y! + n.height! + 4;
      const cbWidth = n.width!;
      return {
        verticalAnchor: "start",
        textAnchor: "middle",
        transform: `translate(${cbTx},${cbTy})`,
        width: cbWidth,
      } as const;

    case "center-center":
      const ccTx = n.position.x! + n.width! / 2;
      const ccTy = n.position.y! + n.height! / 2;
      const ccWidth = n.width! - 2 * SVG_NODE_LABEL_TEXT_PADDING_ALL;
      return {
        verticalAnchor: "middle",
        textAnchor: "middle",
        transform: `translate(${ccTx},${ccTy})`,
        width: ccWidth,
      } as const;

    case "top-center":
      const tcTx = n.position.x! + n.width! / 2;
      const tcTy = n.position.y! + SVG_NODE_LABEL_TEXT_PADDING_ALL;
      const tcWidth = n.width! - 2 * SVG_NODE_LABEL_TEXT_PADDING_ALL;
      return {
        verticalAnchor: "start",
        textAnchor: "middle",
        transform: `translate(${tcTx},${tcTy})`,
        width: tcWidth,
      } as const;

    case "center-left":
      const clTx = n.position.x! + SVG_NODE_LABEL_TEXT_PADDING_ALL;
      const clTy = n.position.y! + n.height! / 2;
      const clWidth = n.width! - 2 * SVG_NODE_LABEL_TEXT_PADDING_ALL;
      return {
        verticalAnchor: "middle",
        textAnchor: "start",
        transform: `translate(${clTx},${clTy})`,
        width: clWidth,
      } as const;

    case "top-left":
      const tlTx = n.position.x! + SVG_NODE_LABEL_TEXT_PADDING_ALL + SVG_NODE_LABEL_TEXT_ADDITIONAL_PADDING_TOP_LEFT;
      const tlTy = n.position.y! + SVG_NODE_LABEL_TEXT_PADDING_ALL + SVG_NODE_LABEL_TEXT_ADDITIONAL_PADDING_TOP_LEFT;
      const tlWidth =
        n.width! - 2 * SVG_NODE_LABEL_TEXT_PADDING_ALL - 2 * SVG_NODE_LABEL_TEXT_ADDITIONAL_PADDING_TOP_LEFT;
      return {
        verticalAnchor: "start",
        textAnchor: "start",
        transform: `translate(${tlTx},${tlTy})`,
        width: tlWidth,
      } as const;
    default:
      assertUnreachable(labelPosition);
  }
}
