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
  namespace: test
  name: switch-example
  version: '0.1.0'
do:
  - getPet:
      call: http
      with:
        method: get
        endpoint: https://petstore.swagger.io/v2/pet/{petId}
  - setInput:
      set:
        message: Hello World
  - processOrder:
      switch:
        - case1:
            when: .orderType == "electronic"
            then: processElectronicOrder
        - case2:
            when: .orderType == "physical"
            then: processPhysicalOrder
        - case3:
            when: .orderType == "tes1"
            then: waitAWhile
        - case4:
            when: .orderType == "test2"
            then: handleUnknownOrderType        
        - default:
            then: handleUnknownOrderType
  - processElectronicOrder:
      do:
        - validatePayment:
            call: http
            with:
              method: post
              endpoint: https://fake-payment-service.com/validate
        - fulfillOrder:
            call: http
            with:
              method: post
              endpoint: https://fake-fulfillment-service.com/fulfill
      then: emitEvent
  - processPhysicalOrder:
      do:
        - checkInventory:
            call: http
            with:
              method: get
              endpoint: https://fake-inventory-service.com/inventory
        - packItems:
            call: http
            with:
              method: post
              endpoint: https://fake-packaging-service.com/pack
        - scheduleShipping:
            call: http
            with:
              method: post
              endpoint: https://fake-shipping-service.com/schedule
      then: raiseAlarm
  - handleUnknownOrderType:
      do:
        - logWarning:
            call: http
            with:
              method: post
              endpoint: https://fake-logging-service.com/warn
        - notifyAdmin:
            call: http
            with:
              method: post
              endpoint: https://fake-notification-service.com/notify
      then: raiseUndefinedPriorityError        
  - emitEvent:
      emit:
        event:
          with:
            source: https://petstore.com
            type: com.petstore.order.placed.v1
            data:
              client:
                firstName: Cruella
                lastName: de Vil
              items:
                - breed: dalmatian
                  quantity: 101 
      then: checkup
  - checkup:
      for:
        each: pet
        in: .pets
        at: index
      while: .vet != null
      do:
        - waitForCheckup:
            listen:
              to:
                one:
                  with:
                    type: com.fake.petclinic.pets.checkup.completed.v2
            output:
              as: '.pets + [{ "id": $pet.id }]' 
      then: trySomething
  - raiseAlarm:
      fork:
        compete: true
        branches:
          - callNurse:
              call: http
              with:
                method: put
                endpoint: https://fake-hospital.com/api/v3/alert/nurses
                body:
                  patientId: \${ .patient.fullName }
                  room: \${ .room.number }
          - callDoctor:
              call: http
              with:
                method: put
                endpoint: https://fake-hospital.com/api/v3/alert/doctor
                body:
                  patientId: \${ .patient.fullName }
                  room: \${ .room.number }
      then: callDoctor
  - callDoctor:
      listen:
        to:
          any:
          - with:
              type: com.fake-hospital.vitals.measurements.temperature
              data: \${ .temperature > 38 }
          - with:
              type: com.fake-hospital.vitals.measurements.bpm
              data: \${ .bpm < 60 or .bpm > 100 }   
      then: trySomething
  - raiseUndefinedPriorityError:
      raise:
        error:
          type: https://fake.com/errors/tickets/undefined-priority
          status: 400
          instance: /raiseUndefinedPriorityError
          title: Undefined Priority
      then: runContainer
  - runContainer:
      run:
        container:
          image: fake-image
      then: trySomething
  - trySomething:
      try:
        - invalidHttpCall:
            call: http
            with:
              method: get
              endpoint: https://
      catch:
        errors:
          with:
            type: https://serverlessworkflow.io.io/dsl/errors/types/communication
            status: 503
        as: error
        retry:
          delay:
            seconds: 3
          backoff:
            exponential: {}
          limit:
            attempt:
              count: 5
      then: waitAWhile
  - waitAWhile:
      wait:
        seconds: 10
      then: setInput
`;

const initialContent = Classes.Workflow.deserialize(content);

const meta: Meta<SwfEditorProps> = {
  title: "Use cases/All Tasks Workflow",
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

export const AllTasksWorkflow: Story = {
  render: Empty.render,
  args: {
    model: model,
    issueTrackerHref: "",
    isReadOnly: true,
    rawContent: content,
  },
};
