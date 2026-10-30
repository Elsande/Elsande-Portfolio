export const projects = [
  {
    id: "01",
    category: "research",
    label: {
      en: "Research / Reinforcement learning",
      id: "Penelitian / Reinforcement learning",
    },
    title: {
      en: "DoS attack classification",
      id: "Klasifikasi serangan DoS",
    },
    description: {
      en: "Using Proximal Policy Optimization to classify denial-of-service attacks on blockchain networks. Undergraduate thesis covering experimental design, model development, and evaluation.",
      id: "Menggunakan Proximal Policy Optimization untuk klasifikasi serangan denial-of-service pada jaringan blockchain. Skripsi yang mencakup perancangan eksperimen, pengembangan model, dan evaluasi.",
    },
    stack: "Python · PPO · Network security",
    url: "https://github.com/Elsande/Klasifikasi-Serangan-DoS-pada-Jaringan-Blockchain",
    workflow: {
      input: "BLOCKCHAIN NETWORK",
      model: "PPO",
      output: "ATTACK CLASSIFICATION",
    },
  },
  {
    id: "02",
    category: "vision",
    label: {
      en: "Computer vision / Transfer learning",
      id: "Computer vision / Transfer learning",
    },
    title: {
      en: "Tomato disease detection",
      id: "Deteksi penyakit tanaman tomat",
    },
    description: {
      en: "Multi-class image classification with pretrained ResNet-v2, including image preprocessing and model fine-tuning using TensorFlow Hub.",
      id: "Klasifikasi citra multi-kelas dengan ResNet-v2 pretrained, termasuk prapemrosesan citra dan fine-tuning model menggunakan TensorFlow Hub.",
    },
    stack: "TensorFlow · ResNet-v2 · Transfer learning",
    url: "https://github.com/Elsande/Project-Macro---Klasifikasi-Tanaman-Tomat",
    workflow: {
      input: "PLANT IMAGES",
      model: "ResNet-v2",
      output: "DISEASE CLASSIFICATION",
    },
  },
  {
    id: "03",
    category: "vision",
    label: {
      en: "Computer vision / MLOps",
      id: "Computer vision / MLOps",
    },
    title: {
      en: "Used goods classification",
      id: "Klasifikasi barang bekas",
    },
    description: {
      en: "A hands-on workflow from collecting and labeling images to augmentation, model training, and a real-time inference demonstration through the Roboflow API.",
      id: "Alur kerja dari pengumpulan dan pelabelan citra, augmentasi, pelatihan model, hingga demonstrasi inferensi real-time melalui API Roboflow.",
    },
    stack: "Roboflow · Image preprocessing · API",
    url: "https://github.com/Elsande/Nusantara-Valor",
    workflow: {
      input: "LABELED IMAGES",
      model: "Roboflow",
      output: "REAL-TIME INFERENCE",
    },
  },
  {
    id: "04",
    category: "ml",
    label: {
      en: "Machine learning / Predictive analytics",
      id: "Machine learning / Analitik prediktif",
    },
    title: {
      en: "Diabetes classification",
      id: "Klasifikasi diabetes",
    },
    description: {
      en: "Comparing Random Forest and MLP classifiers using accuracy, precision, recall, F1-score, and AUC-ROC to assess model performance.",
      id: "Membandingkan classifier Random Forest dan MLP menggunakan accuracy, precision, recall, F1-score, dan AUC-ROC untuk mengevaluasi performa model.",
    },
    stack: "Scikit-Learn · Random Forest · MLP",
    url: "https://github.com/Elsande/Klasifikasi-Diabetes",
    workflow: {
      input: "PATIENT DATA",
      model: "RF / MLP",
      output: "MODEL COMPARISON",
    },
  },
];
