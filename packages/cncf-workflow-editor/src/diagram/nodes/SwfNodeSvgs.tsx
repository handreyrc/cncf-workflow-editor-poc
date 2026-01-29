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
import { DEFAULT_NODE_FILL, DEFAULT_NODE_STROKE_COLOR, DEFAULT_NODE_STROKE_WIDTH } from "./NodeStyle";

export type NodeLabelPosition = "center-bottom" | "center-center" | "top-center" | "center-left" | "top-left";

export type NodeSvgProps = RF.Dimensions &
  RF.XYPosition & {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
  };

export const ___NASTY_HACK_FOR_SAFARI_to_force_redrawing_svgs_and_avoid_repaint_glitches = { flag: false };

// This function makes sure that independent of strokeWidth, the size and position of the element is preserved. Much like `box-sizing: border-box`;
export function normalize<T extends NodeSvgProps>(_props: T) {
  const {
    strokeWidth: _strokeWidth,
    x: _x,
    y: _y,
    width: _width,
    height: _height,
    fillColor: _fillColor,
    strokeColor: _strokeColor,
    ...props
  } = _props;

  const strokeWidth = _strokeWidth ?? DEFAULT_NODE_STROKE_WIDTH;
  const halfStrokeWidth = strokeWidth / 2;

  const x = _x + halfStrokeWidth;
  const y = _y + halfStrokeWidth;
  const width = _width - strokeWidth;
  const height = _height - strokeWidth;

  return {
    strokeWidth,
    x,
    y,
    width: width + (___NASTY_HACK_FOR_SAFARI_to_force_redrawing_svgs_and_avoid_repaint_glitches.flag ? 0.1 : 2),
    height: height + (___NASTY_HACK_FOR_SAFARI_to_force_redrawing_svgs_and_avoid_repaint_glitches.flag ? 2 : 0.1),
    fillColor: _fillColor,
    strokeColor: _strokeColor,
    props,
  };
}

export function UnknownNodeSvg(_props: NodeSvgProps & { strokeDasharray?: string }) {
  const { strokeWidth, x, y, width, height, props } = normalize(_props);
  const strokeDasharray = props.strokeDasharray ?? "2,4";
  return (
    <>
      <rect
        {...props}
        x={x}
        y={y}
        width={width}
        height={height}
        fill={"transparent"}
        stroke={"red"}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
      />
    </>
  );
}

//do
export function CallTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.09622 37.424786"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-52.494636,-129.31217)">
          <path d="m 146.43034,129.44481 a 9.02771,18.579899 0 0 0 -0.56948,0.0367 H 52.627279 v 37.10885 h 93.449071 a 9.02771,18.579899 0 0 0 0.35399,0.0139 9.02771,18.579899 0 0 0 9.02787,-18.57974 9.02771,18.579899 0 0 0 -9.02787,-18.57975 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function DoTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.0709 37.373623"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-45.508498,-183.09183)">
          <path d="M 45.641142,183.22448 V 220.3328 H 148.44675 v -37.10832 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function EmitTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.18724 37.436783"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-182.00074,-176.38017)">
          <path d="m 192.05057,176.50794 -4.8e-4,0.0191 h -9.88985 l 4.14441,18.51106 -4.14441,18.60772 H 197.659 c 0.17818,0.0251 0.35791,0.0377 0.53895,0.0377 0.17612,1e-4 0.35217,-0.0121 0.52793,-0.0367 h 2.346 l -4.9e-4,0.0284 h 75.29201 c 0.10934,0.009 0.21874,0.0141 0.32816,0.014 0.23325,1e-5 0.46431,-0.021 0.69273,-0.0625 h 0.0618 l -0.003,-0.0114 c 4.26985,-0.84424 7.61713,-8.80957 7.61717,-18.51106 -4e-5,-9.71348 -3.35557,-17.6865 -7.63297,-18.51415 l 0.0182,-0.0822 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function ForTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 102.99132 37.43047"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-174.09805,-273.29875)">
          <path d="m 183.25858,273.43137 c -4.9859,-1.8e-4 -9.02783,8.31829 -9.02787,18.57975 4e-5,10.26147 4.04197,18.57992 9.02787,18.57974 0.18997,10e-5 0.37989,-0.0121 0.56948,-0.0367 h 2.53059 l -5.2e-4,0.0284 h 81.21675 c 0.11794,0.009 0.23596,0.0141 0.35399,0.014 4.9859,1.8e-4 9.02783,-8.31829 9.02787,-18.57975 -4e-5,-10.26147 -4.04197,-18.57992 -9.02787,-18.57974 -0.91432,-4.8e-4 0.71109,0.0367 -1.58802,0.0367 l -82.72828,-0.0284 c -0.11794,-0.009 -0.23596,-0.014 -0.35399,-0.0139 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function ForkTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.13476 37.458969"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-408.27773,-188.74927)">
          <g transform="matrix(0.99995326,0,0,1.0378327,0.02149458,-8.0512099)">
            <path d="M 408.42155,193.47716 V 225.5945 H 511.24174 V 193.47716 Z" />
            <path d="m 408.40485,189.75591 h 102.88056 v 2.20462 H 408.40485 Z" />
          </g>
        </g>
      </svg>
    </>
  );
}

//ok
export function ListenTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  const rx =
    typeof height === "number"
      ? height / 10
      : (() => {
          throw new Error("Can't calculate rx based on a string height.");
        })();

  const ry =
    typeof width === "number"
      ? width / 20
      : (() => {
          throw new Error("Can't calculate ry based on a string width.");
        })();

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 102.5723 37.39465"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(130.31501,-209.31843)">
          <path d="m -42.477194,246.56481 14.51726,-37.09813 H -130.09778 l 14.51778,37.09813 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function RaiseTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 102.93492 37.373772"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(129.64583,-156.89792)">
          <path d="m -114.85934,157.0464 -14.56862,37.0768 h 102.49917 l -14.56914,-37.0768 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function RunTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.05651 37.385559"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-45.62345,-227.50279)">
          <path d="m 45.752246,227.63158 v 37.12797 h 88.167744 v -0.18604 h 0.045 L 148.516,246.10436 133.96495,227.6352 h -0.045 v -0.004 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function SetTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  const rx =
    typeof height === "number"
      ? height / 10
      : (() => {
          throw new Error("Can't calculate rx based on a string height.");
        })();

  const ry =
    typeof width === "number"
      ? width / 20
      : (() => {
          throw new Error("Can't calculate ry based on a string width.");
        })();

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.0709 37.373623"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-42.95531,-313.14844)">
          <path d="M 145.89357,313.28108 V 350.3894 H 43.087957 v -27.63515 l 10.31929,-9.47317 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function SwitchTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 102.79195 37.304436"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-76.28408,-131.87298)">
          <path d="m 91.42181,132.00176 v 0.10852 h -0.422713 l -14.55105,18.46916 14.55105,18.46916 h 72.939733 v -0.10852 h 0.4222 l 14.55105,-18.46916 -14.55105,-18.46916 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function TryTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 102.93547 37.763683"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-45.660501,-224.97324)">
          <path d="m 53.387594,225.10147 -7.570397,37.50722 h 95.051663 l 7.57041,-37.50722 z" />
        </g>
      </svg>
    </>
  );
}

//ok
export function WaitTaskSvg(__props: NodeSvgProps) {
  const {
    strokeWidth,
    x,
    y,
    width,
    height,
    fillColor,
    strokeColor,
    props: { ...props },
  } = normalize(__props);

  return (
    <>
      <svg
        {...props}
        width={width}
        height={height}
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 103.1209 37.392742"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        fill={fillColor ?? DEFAULT_NODE_FILL}
        stroke={strokeColor ?? DEFAULT_NODE_STROKE_COLOR}
        strokeLinejoin={"round"}
        strokeWidth={strokeWidth - 0.5}
      >
        <g transform="translate(-216.22191,-175.83079)">
          <path d="m 227.05901,175.96342 -5.2e-4,0.0191 h -10.66808 l 4.47053,18.50585 -4.47053,18.60248 h 93.86404 v -0.0191 h 8.91987 l -4.47053,-18.50585 4.47053,-18.60248 z" />
        </g>
      </svg>
    </>
  );
}
