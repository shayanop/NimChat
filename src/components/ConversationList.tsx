import { Conversation } from "@/types/chat";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ConversationListProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export const ConversationList = ({
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
}: ConversationListProps) => {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border/50">
        <Button
          onClick={onNewConversation}
          className="w-full justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth shadow-glow"
        >
          <MessageSquarePlus className="h-4 w-4" />
          New Chat
        </Button>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className={cn(
                "w-full justify-start gap-2 transition-smooth",
                currentConversationId === conversation.id
                  ? "bg-secondary text-foreground"
                  : "hover:bg-secondary/50"
              )}
              onClick={() => onSelectConversation(conversation.id)}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="truncate text-sm">{conversation.title}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
