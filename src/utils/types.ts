import type { LucideProps } from "lucide-react";

export interface Conversation{
    id: string;
    name: string;
    avatar:string;
    status?: 'online' | 'offline' | 'away' | 'busy';
    messages: Array<{
        from: string;
        text: string;
        time: string;
        timestamp?: string;
        seen:boolean;
    }>;
    timestamp?: string;
    seen: boolean;
    selected:boolean

}
export interface AIConversation {
    text: string;
    type: string;
    references?:Array<{
        id:number;title:string;
        content:string;
        source:string;
        icon:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> 
            & React.RefAttributes<SVGSVGElement>>,
        type:string
    }>}