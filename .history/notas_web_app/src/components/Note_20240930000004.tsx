import { useDrag } from 'react-dnd';

const Note = ({ note }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'NOTE',
    item: { id: note.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {note.title}
    </div>
  );
};

export default Note;