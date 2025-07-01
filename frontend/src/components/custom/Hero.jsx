import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Brain, Book, MessageCircleDashed, Search, Trash, Upload, Gavel, BookOpen } from 'lucide-react'
import { Input } from '../ui/input'
import { Select, SelectTrigger, SelectValue,SelectContent,SelectItem } from '../ui/select'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import axios from 'axios'
 

export const Hero = () => {

    const documentCategories = [
                  "Case Law",
                  "Statutes",
                  "Regulations",
                  "Court Rules",
                  "Legal Opinions",
                  "Contracts",
                  "Briefs",
                  "Motions",
                  "Judgments",
                  "Legal Textbooks",
                  "Law Review Articles",
                  "Other",
                  ];

    const quickQueries = [
                 "Summarize the key holdings in my uploaded cases",
                 "Find precedents related to contract interpretation",
                 "What are the procedural requirements for this motion?",
                 "Compare the reasoning in these similar cases",
                 "Draft a research memo on this legal issue",
                 "Identify potential defenses based on case law",
               ]

    const [selectedCategory, setSelectedCategory] = useState('');
    const [researching, setResearching] = useState(false);
    const [ userInput, setUserInput ] = useState('');
    const [messages, setMessages] = useState([]);
    const [files, setFiles] = useState([]);
   

    const handleQuery = async () => {
        const tempBotId = crypto.randomUUID();

        let userMsg = {
        id: crypto.randomUUID(),  
        role:"user",
        content:userInput,
        };
        let loadingBotMsg = {
        id: tempBotId,
        role: "bot",
        content: "__typing__", 
        };

        try{
            setResearching(true);
            setMessages((prev)=>[...prev,userMsg,loadingBotMsg]);
            setUserInput("");
            
            const resp = await axios.post('http://localhost:3000/research', {userMsg})
           
            const botMsg = {
                id: crypto.randomUUID(), 
                role: "bot",
                content: resp.data.botResponse,
            }
            setMessages((prev)=> 
                prev.map((msg)=> (msg.id === tempBotId ? botMsg : msg)
            ));
        }
        catch(error){
            console.error("Error during research query:", error);
        }    
    }

    const handleFileUpload = async (e,selectedCategory) => {
        const newFiles = Array.from(e.target.files);
        const filesWithCategory = newFiles.map((file) => ({
            file:file,
            category: selectedCategory,
            id: crypto.randomUUID(),
        }));
        setFiles((prev)=> [...prev, ...filesWithCategory]);

        const formData = new FormData();
        filesWithCategory.forEach(fileObj=> {
            formData.append("files", fileObj.file);}
        )

        try{
            const res = await axios.post("http://localhost:3000/documents",formData,{
                header: {
                    'Content-Type': 'multipart/form-data',}
            })
            if(res.status === 200){
                console.log("Files uploaded successfully");
            }
        }
        catch(error){
            console.error("Error uploading files:", error);
        }
    }

  return (
    <main className='w-full flex flex-col gap-4 lg:flex-row'>

        {/* Document Upload Section */}

        <section className='flex flex-col gap-5 w-full lg:w-[30%]'>
            <Card className="bg-slate-800/50 backdrop-blur border border-slate-700 text-slate-200">
                <CardHeader >
                    <CardTitle className='flex items-center gap-3 text-lg font-semibold'>
                        <Upload className='h-5 w-5'/>
                         Document Upload
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className='flex flex-col gap-4'>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className='w-full text-muted-foreground'>
                            <SelectValue className='' placeholder='Select Document Category' />
                        </SelectTrigger>
                        <SelectContent className='bg-slate-600/50 backdrop-blur text-white'>
                            {documentCategories.map((category)=>(
                                <SelectItem  key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Input 
                    type='file'
                    multiple
                    className='w-full file:text-slate-400 file:text-xs text-slate-200'
                    accept=".txt,.pdf,.doc,.docx"
                    onChange ={(e) => handleFileUpload(e,selectedCategory)}
                    />
                    <p className="text-sm text-slate-400">Supported: PDF, DOC, DOCX, TXT</p>
                    </div>    
                </CardContent>
            </Card>

            {/* Legal Library section */}

            {files?.length >0 && (
                <Card className='bg-slate-800/50 backdrop-blur border border-slate-700'>
                    <CardHeader>
                        <CardTitle className='flex items-center gap-3 text-lg  text-white font-semibold'>
                            <Book className='h-5 w-5'/>
                            {`Legal Library (${files.length})`}</CardTitle>
                    </CardHeader>
                    {files.map((obj) => (
                        <CardContent key={obj.id} className='mx-2 p-2 flex flex-col rounded bg-slate-600/50'>
                        <div className='p-4 w-full flex justify-between items-center '>
                            <p className='text-sm px-3 bg-blue-300 rounded-md text-black'>{`${obj.category || "Others"}`}</p>
                            <Trash className = 'h-5 w-5 rounded-md hover:bg-blue-300 text-red-500 cursor-pointer' onClick={() => setFiles(files.filter(f => f.id !== obj.id))}/>
                                 </div>
                                <div>
                                    <p className='text-slate-50 text-sm'>{obj.file.name}</p>
                        <p className='text-slate-50 text-sm'>{obj.file.lastModifiedDate.toLocaleString()}</p>  
                                </div>
                    </CardContent>
                    ))}
                </Card>
            )}

            {/* Quick Research section */}

            <Card className='text-slate-200 bg-slate-800/50 backdrop-blur border border-slate-700'>
                <CardHeader>
                    <CardTitle className='flex items-center gap-3 text-lg font-semibold'>
                        <Search className='w-5 h-5'/>
                        Quick Research
                    </CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col gap-3'>
                    {quickQueries.map((query)=> (
                        <p 
                        key={query}
                        className='w-full p-2 text-sm rounded-md bg-slate-600/50 hover:bg-slate-300 hover:text-black cursor-pointer'
                        onClick = {() => setUserInput(query)}
                        
                        >{query}</p>
                    ))}

                </CardContent>
            </Card>
        </section>

        {/* Chat Area section */}

        <section className='w-full lg:w-[70%]'>
            <Card className='text-slate-200 bg-slate-800/50 backdrop-blur border border-slate-700'>
                <CardHeader>
                    <CardTitle className='flex flex-col items-center gap-3'>
                        <MessageCircleDashed className='h-5 w-5 '/>
                        <p className=' font-semibold'>Legal Research Assistant</p>
                        <p className='text-xs bg-slate-600/50 rounded-md text-slate-50'>
                            {` ${files.length} Legal Documents in Research Database`}
                        </p>
                    </CardTitle>
                </CardHeader>

                {/* Taglines rendered only while not researching */}

                { !researching && (
                    <CardContent > 
                    <div className='flex flex-col items-center gap-4 mt-4'>
                        <Brain className="h-20 w-20 text-blue-400" />
                        <p className='text-2xl text-center text-white font-semibold'>Lexis Ready for Legal Research</p>
                        <p className='text-center font-light'>{files.length > 0 ? "Your legal documents are loaded. Ask me about case law, precedents, or legal analysis." :
                         "Upload your legal documents to ask about case law, precedents, or legal analysis."}</p>

                        <div className='flex flex-col items-center gap-2 w-full md:flex-row md:justify-center'>
                            <div className='h-[120px] bg-slate-600/50 p-3 w-full sm:w-[300px] rounded-md flex flex-col items-center gap-1'>
                                <Gavel className='h-6 w-6 text-blue-500' />
                                <p className='text-white font-semibold'>Case Analysis</p>
                                <p className='text-sm text-center text-slate-200'>Analyze holdings, reasoning, and precedents</p>
                            </div>
                            <div className='h-[120px] bg-slate-600/50 p-3 w-full sm:w-[300px] rounded-md flex flex-col gap-1 items-center'>
                                <BookOpen className='h-6 w-6 text-blue-500' />
                                <p className='text-white font-semibold'>Legal Research</p>
                                <p className='text-sm text-center text-slate-200'>Find relevant statutes and authorities</p>
                            </div>
                        </div>
                    </div>
                </CardContent>
                )}

                 {/* Main Chat Area */}

                { researching && (
                    <div className='flex flex-col h-screen'>
                        <div className='flex-1 overflow-y-auto'>
                            {messages?.map((message)=>(
                                <div key={message.id} className={`flex m-1 ${message.role == "user" ? "justify-end" : "justify-start"}`}>
                                    {message.content == "__typing__" ? (
                                        <div className={`p-2 m-2 rounded-md  animate-pulse text-gray-300`}
                                         >Lexis is typing...</div>
                                        ):
                                    ( <div
                                 className={`p-2 m-2 text-white rounded-md  ${message.role == "user" ? "bg-slate-500/50 backdrop-blur" : "bg-slate-400/50 backdrop-blur" }`}
                                 >{message.content}</div>
                                    )}
                                </div>
                            ))}

                        </div>
                    </div>
                )}

                <Separator className='md:mt-[50px]'></Separator>

                {/* Footer */}

                <CardFooter className='w-full flex gap-2'>
                    <Input 
                    type='text'
                    className='w-full text-white bg-slate-600/50'
                    placeholder='Ask Lexis about your legal documents...'
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    
                    />
                    <Button className='bg-blue-500 text-white' onClick = {handleQuery}>
                        Research
                    </Button>
                </CardFooter>
            </Card>
        </section>
    </main>
  )
}
