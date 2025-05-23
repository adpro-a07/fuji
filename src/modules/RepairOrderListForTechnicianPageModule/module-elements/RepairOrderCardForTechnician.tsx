import React, { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RepairOrderForTechnician } from "../interface"
import RepairOrderCardExpandedContent from "./RepairOrderCardExpandedContent"

export default function RepairOrderCardForTechnician({ repairOrder }: { repairOrder: RepairOrderForTechnician }) {
    const [expanded, setExpanded] = useState(false)

    return (
        <Card
            className={`w-full transition-all border hover:shadow-lg ${
                expanded ? "bg-muted/30" : "cursor-pointer"
            }`}
            onClick={() => !expanded && setExpanded(true)}
        >
            <div className="flex items-center justify-between p-4">
                <div>
                    <h3 className="text-lg font-semibold">{repairOrder.itemName}</h3>
                    <p className="text-sm text-muted-foreground">
                        Condition: {repairOrder.itemCondition}
                    </p>
                    <p className="text-sm text-muted-foreground">
                        Issue: {repairOrder.issueDescription.substring(0, 50)}...
                    </p>
                </div>
                <div>
                    <Button variant="ghost" size="icon" onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}>
                        {expanded ? <ChevronUp /> : <ChevronDown />}
                    </Button>
                </div>
            </div>

            {expanded && (
                <RepairOrderCardExpandedContent repairOrder={repairOrder} />
            )}
        </Card>
    )
}