import { RepairOrderResponseInterface } from "../RepairOrderListModule/interface"

export interface RepairOrderWithoutTechnicianDataInterface extends Omit<RepairOrderResponseInterface, "technicianId"> {}
