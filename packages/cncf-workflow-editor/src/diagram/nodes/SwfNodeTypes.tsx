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

export const NODE_TYPES = {
  CallTask: "node_CallTask" as const,
  DoTask: "node_DoTask" as const,
  ForkTask: "node_ForkTask" as const,
  EmitTask: "node_EmitTask" as const,
  ForTask: "node_ForTask" as const,
  ListenTask: "node_ListenTask" as const,
  RaiseTask: "node_RaiseTask" as const,
  RunTask: "node_RunTask" as const,
  SetTask: "node_SetTask" as const,
  SwitchTask: "node_SwitchTask" as const,
  TryTask: "node_TryTask" as const,
  WaitTask: "node_WaitTask" as const,
  unknown: "node_unknown" as const,
};
