export const projects = [
  {
    id: "rag-document-assistant",
    slug: "rag-document-assistant",
    title: "RAG-Based AI Document Assistant",
    shortDescription:
      "End-to-end RAG-powered AI chatbot using Java Spring Boot microservices with LLM integration. Features document ingestion with PDF/DOCX parsing, semantic chunking, vector search with PostgreSQL & PGVector, and RabbitMQ-based async workflow orchestration containerized with Docker.",
    hasDeepDive: true,
    tags: [
      "Java",
      "LLMs",
      "RAG",
      "Spring Boot",
      "OpenAI",
      "PostgreSQL",
      "PGVector",
      "RabbitMQ",
      "Docker",
    ],
    githubUrl: "https://github.com/niharikareddy018/Vector_Service",
    liveUrl: "#",
    date: "2026-07-01",
  },
  {
    id: "travelling-salesman-aco",
    slug: "travelling-salesman-aco",
    title: "Travelling Salesman Problem using ACO",
    shortDescription:
      "Implemented Ant Colony Optimization (ACO) metaheuristic to solve the classic TSP with Google Maps API integration. Features real-time route visualization, distance matrix calculation, and an interactive full-stack UI for location input and optimized path display.",
    hasDeepDive: true,
    tags: ["Node.js", "React", "Google Maps API", "ACO", "Algorithms"],
    githubUrl:
      "https://github.com/niharikareddy018/Travelling_Salesman_Problem_Using_ACO",
    liveUrl: "#",
    date: "2025-11-20",
  },
  {
    id: "suicide-note-detection",
    slug: "suicide-note-detection",
    title: "Suicide Note Detection using ML",
    shortDescription:
      "Supervised machine learning classifier for text classification to identify potential suicide notes. Applied NLP preprocessing techniques including tokenization, TF-IDF vectorization, and hyperparameter tuning with cross-validation for robust, reliable detection.",
    hasDeepDive: false,
    tags: ["Python", "Scikit-learn", "NLP", "Machine Learning"],
    githubUrl:
      "https://github.com/niharikareddy018/Suicide_Note_Detection_Model",
    liveUrl: "#",
    date: "2025-08-10",
  },
  {
    id: "number-plate-recognition",
    slug: "number-plate-recognition",
    title: "Number Plate Recognition and Vehicle Count",
    shortDescription:
      "Real-time image processing pipeline for vehicle license plate detection, recognition, and automated counting using Java + OpenCV. Uses contour detection, preprocessing, and OCR for plate extraction paired with vehicle counting for intelligent traffic monitoring.",
    hasDeepDive: false,
    tags: ["Java", "OpenCV", "Computer Vision", "OCR", "Image Processing"],
    githubUrl: "#",
    liveUrl: "#",
    date: "2025-06-05",
  },
];
