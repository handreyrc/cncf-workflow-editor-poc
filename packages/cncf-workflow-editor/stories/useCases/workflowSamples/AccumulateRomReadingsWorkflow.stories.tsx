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
import type { Meta, StoryObj } from "@storybook/react";
import { Empty } from "../../misc/empty/Empty.stories";
import { SwfEditor, SwfEditorProps } from "../../../src/SwfEditor";
import { StorybookSwfEditorProps } from "../../swfEditorStoriesWrapper";
import { Classes, validate } from "@serverlessworkflow/sdk";

const content = `
document:
  dsl: '1.0.0'
  namespace: examples
  name: accumulate-room-readings
  version: '0.1.0'
do:
  - consumeReading:
      listen:
        to:
          all:
            - with:
                source: https://my.home.com/sensor
                type: my.home.sensors.temperature
              correlate:
                roomId:
                  from: .roomid
            - with:
                source: https://my.home.com/sensor
                type: my.home.sensors.humidity
              correlate:
                roomId:
                  from: .roomid
      output:
        as: .data.reading
  - logReading:
      for:
        each: reading
        in: .readings
      do:
        - callOrderService:
            call: openapi
            with:
              document:
                endpoint: http://myorg.io/ordersservices.json
              operationId: logreading
  - generateReport:
      call: openapi
      with:
        document:
          endpoint: http://myorg.io/ordersservices.json
        operationId: produceReport
timeout:
  after:
    hours: 1
`;

const initialContent = Classes.Workflow.deserialize(content);

const meta: Meta<SwfEditorProps> = {
  title: "Use cases/Accumulate RomR eadings Workflow",
  component: SwfEditor,
  includeStories: /^[A-Z]/,
};

export default meta;
type Story = StoryObj<StorybookSwfEditorProps>;
const model = initialContent;

if (!model) {
  try {
    validate("Workflow", model);
  } catch (error) {
    console.log(error);
  }

  throw new Error("SWF - model is null!!!!");
}

export const AccumulateRomReadingsWorkflow: Story = {
  render: Empty.render,
  args: {
    model: model,
    issueTrackerHref: "",
    isReadOnly: true,
    rawContent: content,
  },
};
