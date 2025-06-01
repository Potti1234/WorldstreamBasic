"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, DollarSign } from "lucide-react"

interface DonationButtonProps {
  streamerName: string
}

export function DonationButton({ streamerName }: DonationButtonProps) {
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isOpen, setIsOpen] = useState(false)

  const handleDonate = () => {
    if (!amount || Number.parseFloat(amount) <= 0) return

    // Here you would integrate with a payment processor
    alert(`Thank you for donating $${amount} to ${streamerName}!`)
    setAmount("")
    setMessage("")
    setIsOpen(false)
  }

  const quickAmounts = ["5", "10", "25", "50"]

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-500 border-red-500 hover:bg-red-50">
          <Heart className="w-4 h-4 mr-1" />
          Donate
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Support {streamerName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Donation Amount</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="pl-10"
                min="1"
                step="0.01"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((quickAmount) => (
              <Button
                key={quickAmount}
                variant="outline"
                size="sm"
                onClick={() => setAmount(quickAmount)}
                className="text-xs"
              >
                ${quickAmount}
              </Button>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message (Optional)</label>
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Say something nice..."
              maxLength={100}
            />
          </div>

          <Button
            onClick={handleDonate}
            className="w-full bg-red-500 hover:bg-red-600"
            disabled={!amount || Number.parseFloat(amount) <= 0}
          >
            <Heart className="w-4 h-4 mr-2" />
            Donate ${amount || "0.00"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
