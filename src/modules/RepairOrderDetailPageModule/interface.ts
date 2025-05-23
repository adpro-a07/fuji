import { RepairOrderResponseInterface } from "../RepairOrderListModule/interface"

export type RepairOrderWithoutTechnicianData = Omit<RepairOrderResponseInterface, "technicianId">