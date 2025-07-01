import React from 'react'
import { Badge } from '../ui/badge'
import { Brain } from 'lucide-react'

export const Header = () => {
  return (
    <div className="text-center flex flex-col gap-3 items-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Brain className="h-10 w-10 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">LEXIS</h1>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              AI Research Assistant
            </Badge>
          </div>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-2">
            Legal Expert Information System - Your AI-Powered Research Partner
          </p>
          <p className="text-blue-200 font-light max-w-2xl mx-auto">
            Upload case law, statutes, and legal documents. Get instant analysis, find precedents, and accelerate your
            legal research.
          </p>
        </div>
  )
}
