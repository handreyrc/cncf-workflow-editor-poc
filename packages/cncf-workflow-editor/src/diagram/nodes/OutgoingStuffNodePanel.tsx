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
import { EdgeType, NodeType } from "../connections/graphStructure";
import { Flex, FlexItem } from "@patternfly/react-core/dist/js/layouts/Flex";
import { TransitionPath, ConditionPath, DefaultPath } from "../edges/SwfEdges";
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
} from "./SwfNodeSvgs";
import { NODE_TYPES } from "./SwfNodeTypes";
import { EDGE_TYPES } from "../edges/SwfEdgeTypes";
import { useSettings } from "../../settings/SwfEditorSettingsContext";
import { useSwfEditorI18n } from "../../i18n";

const handleButtonSize = 34; // That's the size of the button. This is a "magic number", as it was obtained from the rendered page.
const svgViewboxPadding = Math.sqrt(Math.pow(handleButtonSize, 2) / 2) - handleButtonSize / 2; // This lets us create a square that will perfectly fit inside the button circle.

const edgeSvgViewboxSize = 25;

const nodeSvgProps = { width: 100, height: 70, x: 0, y: 15, strokeWidth: 8 };
const nodeSvgViewboxSize = nodeSvgProps.width;

export const handleStyle: React.CSSProperties = {
  display: "flex",
  position: "unset",
  transform: "unset",
};

export function OutgoingStuffNodePanel(props: {
  isVisible: boolean;
  nodeTypes: NodeType[];
  edgeTypes: EdgeType[];
  nodeHref: string;
}) {
  const { i18n } = useSwfEditorI18n();
  const settings = useSettings();
  const style: React.CSSProperties = React.useMemo(
    () => ({
      visibility: !settings.isReadOnly && props.isVisible ? undefined : "hidden",
    }),
    [props.isVisible, settings.isReadOnly]
  );

  const getEdgeActionTitle = React.useCallback((edgeType: string): string => {
    switch (edgeType) {
      case EDGE_TYPES.transition: {
        return i18n.nodes.addTransitionEdge;
      }
      case EDGE_TYPES.condition: {
        return i18n.nodes.addConditionEdge;
      }
      case EDGE_TYPES.default: {
        return i18n.nodes.addDefaultEdge;
      }
      default: {
        throw new Error("Add Unknown edge type");
      }
    }
  }, []);

  const getNodeActionTitle = React.useCallback((nodeType: string): string => {
    switch (nodeType) {
      case NODE_TYPES.CallTask: {
        return i18n.nodes.addCallTaskNode;
      }
      case NODE_TYPES.DoTask: {
        return i18n.nodes.addDoTaskNode;
      }
      case NODE_TYPES.EmitTask: {
        return i18n.nodes.addEmitTaskNode;
      }
      case NODE_TYPES.ForTask: {
        return i18n.nodes.addForTaskNode;
      }
      case NODE_TYPES.ForkTask: {
        return i18n.nodes.addForkTaskNode;
      }
      case NODE_TYPES.ListenTask: {
        return i18n.nodes.addListenTaskNode;
      }
      case NODE_TYPES.RaiseTask: {
        return i18n.nodes.addRaiseTaskNode;
      }
      case NODE_TYPES.RunTask: {
        return i18n.nodes.addRunTaskNode;
      }
      case NODE_TYPES.SetTask: {
        return i18n.nodes.addSetTaskNode;
      }
      case NODE_TYPES.SwitchTask: {
        return i18n.nodes.addSwitchTaskNode;
      }
      case NODE_TYPES.TryTask: {
        return i18n.nodes.addTryTaskNode;
      }
      case NODE_TYPES.WaitTask: {
        return i18n.nodes.addWaitTaskNode;
      }
      default: {
        throw new Error("Add Unknown node type");
      }
    }
  }, []);

  return (
    <>
      <Flex className={"kie-swf-editor--outgoing-stuff-node-panel"} style={style} gap={{ default: "gapNone" }}>
        {props.edgeTypes.length > 0 && (
          <FlexItem>
            {props.edgeTypes.map((edgeType) => (
              <RF.Handle
                key={edgeType}
                id={edgeType}
                isConnectableEnd={false}
                type={"source"}
                style={handleStyle}
                position={RF.Position.Top}
                title={getEdgeActionTitle(edgeType)}
                data-testid={`${props.nodeHref}-add-${edgeType}`}
              >
                <svg
                  className={"kie-swf-editor--round-svg-container"}
                  viewBox={`0 0 ${edgeSvgViewboxSize} ${edgeSvgViewboxSize}`}
                  style={{ padding: `${svgViewboxPadding}px` }}
                >
                  {edgeType === EDGE_TYPES.transition && (
                    <TransitionPath d={`M2,${edgeSvgViewboxSize - 2} L${edgeSvgViewboxSize - 2},0`} />
                  )}
                  {edgeType === EDGE_TYPES.condition && (
                    <ConditionPath d={`M2,${edgeSvgViewboxSize - 2} L${edgeSvgViewboxSize - 2},0`} />
                  )}
                  {edgeType === EDGE_TYPES.default && (
                    <DefaultPath d={`M2,${edgeSvgViewboxSize - 2} L${edgeSvgViewboxSize - 2},0`} />
                  )}
                </svg>
              </RF.Handle>
            ))}
          </FlexItem>
        )}

        {props.nodeTypes.length > 0 && (
          <FlexItem>
            {props.nodeTypes.map((nodeType) => (
              <RF.Handle
                key={nodeType}
                id={nodeType}
                isConnectableEnd={false}
                type={"source"}
                style={handleStyle}
                position={RF.Position.Top}
                title={getNodeActionTitle(nodeType)}
                data-testid={`${props.nodeHref}-add-${nodeType}`}
              >
                <svg
                  className={"kie-swf-editor--round-svg-container"}
                  viewBox={`0 0 ${nodeSvgViewboxSize} ${nodeSvgViewboxSize}`}
                  style={{ padding: `${svgViewboxPadding}px` }}
                >
                  {nodeType === NODE_TYPES.CallTask && <CallTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.DoTask && <DoTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.EmitTask && <EmitTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.ForTask && <ForTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.ForkTask && <ForkTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.ListenTask && <ListenTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.RaiseTask && <RaiseTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.RunTask && <RunTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.SetTask && <SetTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.SwitchTask && <SwitchTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.TryTask && <TryTaskSvg {...nodeSvgProps} />}
                  {nodeType === NODE_TYPES.WaitTask && <WaitTaskSvg {...nodeSvgProps} />}
                </svg>
              </RF.Handle>
            ))}
          </FlexItem>
        )}
      </Flex>
    </>
  );
}
