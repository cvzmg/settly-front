"use client"
import React, { useState, useRef, useEffect } from 'react';
// Import the specific types needed from the libraries
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import 'react-resizable/css/styles.css';

// Define the type for the component's props
interface ContentCardProps {
  children: React.ReactNode;
}

const ContentCard: React.FC<ContentCardProps> = ({ children }) => {
  // State for both size and position
  const [size, setSize] = useState({ width: 400, height: 300 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Ref for the draggable element and parent size
  const nodeRef = useRef<HTMLDivElement>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });

  // Hook to get parent dimensions and set a responsive initial size
  useEffect(() => {
    if (nodeRef.current) {
      const parent = nodeRef.current.parentElement;
      if (parent) {
        setParentSize({
          width: parent.clientWidth,
          height: parent.clientHeight,
        });

        // Ensure initial size is not larger than the parent
        const initialWidth = Math.min(size.width, parent.clientWidth - 20);
        const initialHeight = Math.min(size.height, parent.clientHeight - 20);
        setSize({ width: initialWidth, height: initialHeight });
        
        // Center the component initially
        setPosition({
          x: (parent.clientWidth - initialWidth) / 2,
          y: (parent.clientHeight - initialHeight) / 4,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // This effect should only run once on mount to set the initial state.

  // Update size state on resize with proper types
  const onResize = (event: React.SyntheticEvent, { size }: ResizeCallbackData) => {
    setSize({ width: size.width, height: size.height });
  };
  
  // Update position state on drag with proper types
  const onDrag = (event: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };
  
  // Calculate dynamic max constraints based on current position
  const maxConstraints: [number, number] = [
    parentSize.width > 0 ? parentSize.width - position.x : Infinity,
    parentSize.height > 0 ? parentSize.height - position.y : Infinity,
  ];

  return (
    <Draggable
      handle=".drag-handle"
      nodeRef={nodeRef}
      bounds="parent"
      position={position}
      onDrag={onDrag}
    >
      <div
        ref={nodeRef}
        style={{ width: size.width, height: size.height }}
        className="absolute pointer-events-auto"
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          onResize={onResize}
          minConstraints={[200, 150]}
          maxConstraints={maxConstraints}
          resizeHandles={['se']}
          handle={
            <span
              className="absolute bottom-1 right-1 box-border h-5 w-5 cursor-se-resize border-b-4 border-r-4 border-gray-400 rounded-br-lg"
              style={{
                borderTopColor: 'transparent',
                borderLeftColor: 'transparent',
              }}
            />
          }
          className="relative flex flex-col h-full bg-white border border-gray-300 rounded-lg shadow-lg"
        >
          <div className="drag-handle h-8 bg-gray-100 cursor-move rounded-t-lg flex-shrink-0"></div>
          <div className="p-4 overflow-y-auto flex-grow">
            {children}
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
};

export default ContentCard;
