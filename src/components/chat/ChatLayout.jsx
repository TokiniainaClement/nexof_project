import { useState } from "react";
import { ChatHeader } from "./Header";
import { LeftSidebar } from "./LeftSidebar";
import { MessageArea } from "./MessageArea";
import { RightSidebar } from "./RightSidebar";
import { Menu, X } from "lucide-react";

export function ChatLayout() {
  const [selectedChat, setSelectedChat] = useState("group1");
  const [activeMode, setActiveMode] = useState("normal");
  const [showLeftSidebar, setShowLeftSidebar] = useState(false);
  const [showRightSidebar, setShowRightSidebar] = useState(false);

  return (
    <div className="flex h-screen w-screen bg-background text-foreground overflow-hidden">
      {/* Left Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:static md:transform-none md:z-0`}
      >
        <LeftSidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
      </div>

      {/* Mobile Overlay */}
      {showLeftSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setShowLeftSidebar(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Header */}
        <div className="glass-panel border-b border-cyan-500/30 h-16 flex items-center px-3 sm:px-6 shadow-lg">
          <button
            onClick={() => setShowLeftSidebar(!showLeftSidebar)}
            className="md:hidden p-2 hover:bg-cyan-500/20 mr-2 flex-shrink-0 rounded transition-colors"
          >
            {showLeftSidebar ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-300" />
            )}
          </button>
          <ChatHeader activeMode={activeMode} />
          <button
            onClick={() => setShowRightSidebar(!showRightSidebar)}
            className="lg:hidden p-2 hover:bg-cyan-500/20 ml-2 flex-shrink-0 rounded transition-colors"
          >
            {showRightSidebar ? (
              <X className="w-5 h-5 text-cyan-300" />
            ) : (
              <Menu className="w-5 h-5 text-cyan-300" />
            )}
          </button>
        </div>

        {/* Chat Area */}
        <MessageArea selectedChat={selectedChat} />
      </div>

      {/* Right Sidebar */}
      <div
        className={`fixed inset-y-0 right-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:static lg:transform-none lg:z-0`}
      >
        <RightSidebar activeMode={activeMode} onModeChange={setActiveMode} />
      </div>

      {/* Mobile Overlay for Right Sidebar */}
      {showRightSidebar && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setShowRightSidebar(false)}
        />
      )}
    </div>
  );
}
