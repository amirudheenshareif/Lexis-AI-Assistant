import './App.css'
import { useNavigate } from 'react-router-dom';
import { Badge } from './components/ui/badge';
import {
  Brain,
  CheckCircle,
  XCircle,
  ArrowRight,
  TargetIcon,
} from "lucide-react"
import { Button } from './components/ui/button';
import { challenges, features } from './data/helper';
import { problems } from './data/helper';
import { targetAudiences } from './data/helper';


function App() {

  const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/lexis")
    }

  return (
    <>
    <div className=' min-h-screen p-6 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex flex-col items-center justify-center gap-8'>
       <header className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Brain className="h-10 w-10 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
            </div>
            <h1 className=" className='mb-5 text-center text-white text-3xl sm:text-4xl md:text-5xl font-bold ">LEXIS</h1>
            <Badge variant="secondary" className="bg-blue-600 text-white">
              AI Research Assistant
            </Badge>
          </header>
        
      <h1 className='mt-6 text-slate-300 text-center text-2xl sm:text-3xl md:text-4xl font-bold'>Jarvis for Lawyers</h1>
      <p className='text-center sm:text-1xl md:text-2xl text-slate-300'>Upload all case histories, legal documents, judgments and more - Ask questions in natural language instead of flipping through books or searching manually</p>

      <div className='flex flex-col items-center gap-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6'>
        <TargetIcon className='h-8 w-8 text-blue-400'/>
        <p className='text-center text-white font-semibold'> An AI legal research assistant that helps lawyers query large volumes of legal text, contracts, and
              judgments using natural language.</p>
      </div>

      <Button className='p-6 bg-blue-600' onClick={handleClick}> Try LEXIS Now
        <ArrowRight className="ml-2  h-5 w-5 bg-blue-400 text-whhite rounded-full" />
      </Button>

{/* //challenge section */}
      <section className='flex flex-col gap-4 items-center'>
        <h2 className='mt-6 text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold'>The Legal Research Challenge</h2>
        <p className='text-center text-slate-200 font-medium'>Every day, legal professionals face the same time-consuming obstacles that slow down their work and increase costs</p>
        {
         challenges.map((challenge)=>(
          <div key={challenge.id} className='p-2 rounded-md w-[80%] bg-red-900/20 border-red-700/50 flex flex-col items-center gap-2 '>
            <XCircle className='text-red-400'/>
            <p className='text-red-200'>{challenge.text}</p>
          </div>
         ))
        }
      </section>

{/* problem to solution section */}
      
      <section className='flex flex-col gap-4'>
        <h2 className='mt-6 text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold'>From Problems to Solutions</h2>
        
        {problems.map((problem)=>(
          <div className='flex flex-col gap-4 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6' key={problem.id}>
            <div className='flex gap-2'>
              <div className=' text-red-500 flex gap-1'>
              <XCircle />
              <p className='font-semibold'>Problem:</p>
            </div>
            <div className='text-red-200 italic'>{problem.problem}</div>
            </div>
            
            <div className='flex gap-2'>
              <div className='flex gap-1 text-green-400 font-semibold'>
              <CheckCircle />
              <p>Solution:</p>
            </div>
            <div className='text-green-200'>{problem.solution}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Powerful Features */}

      <section className='flex flex-col gap-4'>
        <h2 className='mt-6 text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold'>Powerful Features for Legal Professionals</h2>

     {features.map((feature)=> (
      <div className='flex flex-col items-start gap-3 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6' key={feature.id}>
        <div className='flex gap-3 items-center'>
         <feature.icon className={feature.iconColor}/>
         <div className='text-2xl font-semibold text-slate-200'>{feature.title}</div>
        </div>
        <div className='text-slate-200 font-light'>{feature.description}</div>
      </div>
     ))}
      </section>

      {/* target audience section */}
      <section className='w-[80%] flex flex-col gap-3'>
        <h2 className='mt-4 text-white text-center text-2xl sm:text-3xl md:text-4xl font-bold'>Built for Legal Professionals</h2>

      {targetAudiences.map((targetAudience)=> (
        <div className=' flex flex-col items-center justify-center gap-2 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6' key={targetAudience.title}>
              <targetAudience.icon className={`w-8 h-8 ${targetAudience.iconColor}`}/>
             <p className='font-semibold text-white'>{targetAudience.title}</p>
             <p className='text-sm text-slate-200'>{targetAudience.desc}</p>
             
        </div>
      ))}
      </section>

      {/* footer */}

      <footer className='p-8 bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-700/50 flex flex-col justify-center items-center gap-4'>
        <Brain className='h-14 w-14 text-blue-400'/>
        <h2 className='text-2xl text-center font-bold text-slate-300'>Ready to Transform Your Legal Research?</h2>
        <p className='text-center text-slate-400'>Join thousands of legal professionals who are already using AI to accelerate their research and analysis.</p>
        <Button className='p-6 bg-blue-600' onClick={handleClick}> Start Using Lexis
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      </footer>
    </div>
    </>
  )
}

export default App
