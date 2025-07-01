import {
  Search,
  FileText,
  Gavel,
  GraduationCap,
  BookOpen,
  Clock,
  Building,
  Users,
} from "lucide-react";

export const challenges = [
  {
    id: crypto.randomUUID(),
    text: "Hours spent manually searching through case files",
  },
  {
    id: crypto.randomUUID(),
    text: "Complex legal language makes finding relevant information difficult",
  },
  {
    id: crypto.randomUUID(),
    text: "Important precedents get missed in large document sets",
  },
  {
    id: crypto.randomUUID(),
    text: "Junior staff struggle without proper research guidance",
  },
];

export const problems = [
  {
    id: crypto.randomUUID(),
    icon: Search,
    problem: "I need to review 300 pages of case history to find similar arguments.",
    solution:
      'Upload the files → Ask: "What previous judgments support breach of contract due to non-performance?"',
  },
  {
    id: crypto.randomUUID(),
    icon: FileText,
    problem: "Where in this agreement is the employee's notice period defined?",
    solution: "Upload agreement → Ask in plain English.",
  },
  {
    id: crypto.randomUUID(),
    icon: Gavel,
    problem: "Is this NDA legally safe?",
    solution: "Highlight missing clauses using AI trained on real NDAs.",
  },
  {
    id: crypto.randomUUID(),
    icon: GraduationCap,
    problem: "Junior lawyers don't know where to start researching.",
    solution: "Give them a smart assistant to guide them, citing correct clauses.",
  },
];

export const features = [
  {
    id: crypto.randomUUID(),
    title: "Smart Document Analysis",
    description:
      "Upload case law, contracts, judgments, and legal documents. AI automatically extracts key information, citations, and legal principles.",
    icon: BookOpen,
    iconColor: "text-blue-400"
  },
  {
    id: crypto.randomUUID(),
    title: "Natural Language Queries",
    description:
      "Ask questions in plain English. No more complex search syntax or manual document scanning. Get precise answers with proper citations.",
    icon: Search,
    iconColor: "text-green-400"
  },
  {
    id: crypto.randomUUID(),
    title: "Instant Research",
    description:
      "Save hours of manual research. Get comprehensive legal analysis, precedent identification, and case comparisons in seconds.",
    icon: Clock,
    iconColor: "text-purple-400"
  },
];

export const targetAudiences = [
  {
    icon: Building,
    title: "Law Firms",
    desc: "Streamline research for your entire practice",
    iconColor: "text-blue-400"
    
  },
  {
    icon: Users,
    title: "In-house Legal Teams",
    desc: "Quick answers for corporate legal matters",
    iconColor: "text-green-400"
    
  },
  {
    icon: GraduationCap,
    title: "Legal Students",
    desc: "Learn faster with AI-guided research",
    iconColor: "text-purple-400"
    
  },
  {
    icon: FileText,
    title: "Paralegals",
    desc: "Efficient document analysis and research",
    iconColor: "text-orange-400"
   
  },
];
