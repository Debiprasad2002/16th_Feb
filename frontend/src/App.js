import './App.css';
import FileUpload from './components/FileUpload'; // Import the FileUpload component
import FileDelete from './components/FileDelete'; // Import the FileDelete component

function App() {
  // Handler function to handle file deletion
  const handleFileDeleted = (filepath) => {
    console.log(`File deleted: ${filepath}`);
    // Add any additional logic here (e.g., updating state, displaying message)
  };

  return (
    <div className="App">
      <FileUpload /> {/* Render the FileUpload component */}
      {/* Example usage of FileDelete component */}
      {/* Pass the filepath and handler function as props */}
      <FileDelete filepath="/path/to/file" onFileDeleted={handleFileDeleted} />
    </div>
  );
}

export default App;
