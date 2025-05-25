import { ChevronDown, ChevronUp } from "lucide-react"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import RepairOrderCardExpandedContent from "./RepairOrderCardExpandedContent"
import { RepairOrderForTechnician } from "../interface"

export default function RepairOrderCardForTechnician({ repairOrder }: { repairOrder: RepairOrderForTechnician }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <Card
      className={`w-full border transition-all hover:shadow-lg ${expanded ? "bg-muted/30" : "cursor-pointer"}`}
      onClick={() => !expanded && setExpanded(true)}
    >
      <div className="flex items-center justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold">{repairOrder.itemName}</h3>
          <p className="text-muted-foreground text-sm">Condition: {repairOrder.itemCondition}</p>
          <p className="text-muted-foreground text-sm">Issue: {repairOrder.issueDescription.substring(0, 50)}...</p>
        </div>
        <div>
          <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
              e.stopPropagation()
              setExpanded(!expanded)
            }}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </Button>
        </div>
      </div>

      {expanded && <RepairOrderCardExpandedContent repairOrder={repairOrder} />}
    </Card>
  )
}
