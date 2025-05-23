/**
 * Copyright © 2025, Oracle and/or its affiliates.
 * This software is licensed to you under the Universal Permissive License (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl.
 */

import { MonitorTypes } from "oci-apmsynthetics/lib/model";

export interface IOCIMonitorCreateInfo {
    displayName: string;
    // monitorType: MonitorTypes;
    target: string;
    scriptId: string
    vantagePoints: string[];
    // repeatIntervalInSeconds: number;
}
