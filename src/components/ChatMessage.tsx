import { Message } from "@/types/chat";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessageProps {
	message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
	const isUser = message.role === 'user';
	
	return (
		<div
			className={cn(
				"flex gap-4 px-6 py-6 transition-smooth animate-in fade-in slide-in-from-bottom-4",
				isUser ? "bg-card/50" : "bg-secondary/30"
			)}
		>
			<div
				className={cn(
					"flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-lg",
					isUser
						? "bg-primary text-primary-foreground"
						: "bg-accent/20 text-accent border border-accent/30"
				)}
			>
				{isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
			</div>
			<div className="flex-1 space-y-2 overflow-hidden">
				<p className="text-sm font-medium">
					{isUser ? "You" : "NVIDIA NIM"}
				</p>
				<div className="prose prose-invert max-w-none text-sm leading-relaxed">
					{isUser ? (
						message.content
					) : (
						<ReactMarkdown
							remarkPlugins={[remarkGfm]}
							components={{
								code({ node, inline, className, children, ...props }) {
									const match = /language-(\w+)/.exec(className || "");
									return inline ? (
										<code className="rounded bg-muted px-1 py-0.5" {...props}>{children}</code>
									) : (
										<pre className="rounded-md bg-muted p-3 overflow-auto">
											<code className={className} {...props}>
												{children}
											</code>
										</pre>
									);
								},
							}}
						>
							{message.content}
						</ReactMarkdown>
					)}
				</div>
			</div>
		</div>
	);
};
