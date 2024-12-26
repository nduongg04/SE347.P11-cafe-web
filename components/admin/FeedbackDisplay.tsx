'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Star } from 'lucide-react'
import { getAllFeedback } from '@/lib/actions/feedback.action'
import type { Feedback } from '@/types/feedback'
import LoadingSpinner from './LoadingSpinner'

type FeedbackDisplayProps = {
  isLoading: boolean
  customerReviews: Feedback[]
}

export function FeedbackDisplay({ isLoading, customerReviews }: FeedbackDisplayProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
          <CardDescription>Loading customer feedback...</CardDescription>
        </CardHeader>
        <CardContent>
          <LoadingSpinner />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Reviews</CardTitle>
        <CardDescription>Recent feedback from our customers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {customerReviews.map((feedback) => (
          <div key={feedback.feedbackId} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
            <Avatar>
              <AvatarFallback>
                {feedback.fullname.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{feedback.fullname}</h4>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < feedback.starNumber
                          ? 'fill-[#00B074] text-[#00B074]'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">{feedback.content}</p>
              <div className="flex gap-4 text-xs text-gray-500">
                <span>{feedback.email}</span>
                <span>{feedback.phonenumber}</span>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

