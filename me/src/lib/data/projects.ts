import type { Project } from '$lib/types';

export const projects: Project[] = [
	{
		id: 'mayo_autonomic_ml',
		name: 'Understanding Autonomic Dysfunction Phenotyping: UMAP Topology + Geodesic ML',
		stack: 'Python · UMAP · HDBSCAN · KMeans · TDA · scikit-learn · SciPy',
		desc: 'UMAP + clustering pipeline on high-dimensional SCI clinical data. Identified SCI-dominant patient clusters correlated with autonomic dysfunction severity.',
		category: 'Research / Data Science / Computational Geometry',
		status: 'In Progress',
		date: 'May 2024 – Present',
		longDesc: `This project spans both ongoing Mayo Clinic research and a formal Computational Geometry course project (April 2026), applied to the same clinical dataset of 65 participants (32 controls, 27 SCI patients). The core problem is whether a topological manifold approach can identify stable, interpretable phenotypic clusters of autonomic dysfunction following spinal cord injury — and whether geodesic distances on the UMAP fuzzy simplicial set graph carry more clinically meaningful signal than raw Euclidean distance.

The pipeline: group-wise median imputation and z-score normalization → UMAP dimensionality reduction (Manhattan metric) → clustering (KMeans, DBSCAN, HDBSCAN) → post-hoc validation against autonomic symptom scores (ADFSCI, COMPASS-31, UTI frequency, hospitalization rate). A full silhouette grid search over 1,664 hyperparameter combinations identified optimal settings (k=4, n_neighbors=5, min_dist=0.0, silhouette=0.572). Geodesic distances were computed by converting UMAP edge weights to lengths via d = -log(w) and running Dijkstra's shortest-path algorithm, with an extension to graft unseen hypothetical patients onto the manifold without refitting.`,
		outcomes: [
			'KMeans (k=4) produced an SCI-exclusive Cluster 0 (24/27 SCI) with highest dysfunction scores (ADFSCI-total mean: 50.50 vs 9.56 for lowest-severity cluster)',
			'Silhouette grid search over 1,664 combos; best: k=4, n_neighbors=5, min_dist=0.0, score=0.572',
			'Euclidean centroid distances computed for all 4 clusters; geodesic distances finite only between Clusters 1 and 2 (geodesic dist: 0.424)',
			'Cluster 0 (SCI-only) most distant from Cluster 2 (Euclidean dist: 2.474)',
			'Identified and formally documented silhouette circularity bias in hyperparameter selection',
			'Implemented unseen-patient manifold grafting via pynndescent + Dijkstra extension',
			'HDBSCAN: 2-cluster solution, mean ADFSCI-total 50.50 (SCI cluster) vs 17.63 (mixed cluster)',
			'Formal 24-page written report with full theoretical background and experimental analysis'
		],
		links: [
			{ label: 'Report (PDF)', url: 'https://drive.google.com/file/d/1Is7qNjDChzTrS04Ef8szCadFNy4k3jxv/view?usp=sharing' }
		]
	},
	{
		id: 'bwave_fmd_tool',
		name: 'BWave.US: An Open-Source FMD Assessment Tool',
		stack: 'Python · OpenCV · SciPy · NumPy · pandas · signal processing',
		desc: 'Open-source brachial ultrasound edge-detection pipeline for flow mediated dilation assessment. Improved automated vessel wall detection. Published at medRxiv.',
		category: 'Research / Software',
		status: 'Published',
		date: '2024 – 2025',
		longDesc: `Developed BWave.US, a novel open-source software program for automated brachial artery edge detection in ultrasound video, designed to measure blood vessel diameter and quantify flow mediated dilation (FMD) — a biomarker for cardiovascular endothelial health. The tool was built to overcome the motion artifact and noise limitations of existing software (FloWave.US) and enable FMD measurement in clinical (non-lab) environments. Edge detection uses automated wall-tracking algorithms with region-of-interest locking across video frames.`,
		outcomes: [
			'Improved retained usable data significantly over FloWave.US in a diverse study population',
			'Enabled FMD measurements in clinical settings without specialized lab equipment',
			'Used in a published PM&R study correlating blood pressure instability with endothelial dysfunction',
			'Presented at BMES 2024 Annual Meeting, Baltimore, MD'
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/bishyboi/BWave' },
			{ label: 'medRxiv', url: 'https://doi.org/10.1101/2025.03.18.25324231' }
		]
	},
	{
		id: 'mayo_patient_data_webapp',
		name: 'Patient Data Analysis Web App (Mayo Clinic)',
		stack: 'Python · NiceGUI',
		desc: 'Secure internal web application to interface clinical patient data with Python-based analysis pipelines at the Mayo Clinic.',
		category: 'Research / Software',
		status: 'Completed',
		date: '2024 – Present',
		longDesc: `Created a secure internal web application to interface clinical patient data with Python-based analysis pipelines at the Mayo Clinic. The app allows researchers to run analyses interactively while maintaining data confidentiality and workflow reproducibility. Designed to replace ad-hoc script execution with a structured, auditable interface.`,
		outcomes: [
			'Enabled efficient, reproducible research workflows for SCI patient data',
			'Maintained data confidentiality and integrity standards required for clinical research'
		],
		links: []
	},
	{
		id: 'scene_graph_generation',
		name: 'Scene Graph Generation from Video (UF DSL)',
		stack: 'Python · GroundingDINO · LLaVA · Llama · spatiotemporal feature engineering',
		desc: 'Automated visual-to-relational dataset pipeline integrating object detection and vision-language models to generate structured relationship triples. Improved precision by 46.9%.',
		category: 'Research / Data Science',
		status: 'Completed',
		date: 'August 2024 – December 2024',
		longDesc: `Built a pipeline that integrates outputs from GroundingDINO (object detection) and LLaVA (vision-language model) to automatically generate structured subject-predicate-object relationship triples from video frames, transforming unstructured visual data into clean, analysis-ready scene graph datasets. Implemented spatiotemporal features using bounding-box distance metrics across frames to model dynamic object interactions. Evaluated on 500+ videos from the STAR dataset.`,
		outcomes: [
			'46.9% improvement in precision over baseline models',
			'35.4% improvement in F1-score over baseline',
			'Evaluated on 500+ video samples from STAR dataset',
			'Presented at Projects in Data Science workshop, UF 2024'
		],
		links: [
			{ label: 'Report (PDF)', url: 'https://drive.google.com/file/d/1bv_xDqrIXosyNBFrQru5BjAOIDl7DmT_/view?usp=sharing' }
		]
	},
	{
		id: 'schizophrenia_bioinformatics',
		name: 'Bioinformatic Analysis of Schizophrenia (RNA-seq + ML)',
		stack: 'R · DESeq2 · tidyverse · caret · SVM · KNN · Naive Bayes · PCA · UMAP · ggplot2',
		desc: 'Analyzed RNA-seq data from 55 patients (29K+ genes) to classify schizophrenia vs controls. Achieved ~83% AUC via cross-validated ML classifiers.',
		category: 'Research / Data Science',
		status: 'Completed',
		date: 'August 2023 – December 2023',
		longDesc: `Analyzed RNA-sequencing data from 55 patients (29K+ genes) to investigate gene expression patterns associated with schizophrenia. Built preprocessing and normalization workflows using DESeq2, then developed and cross-validated machine learning classifiers (SVM, KNN, Naive Bayes) to distinguish schizophrenia patients from controls. Applied dimensionality reduction (PCA, UMAP) for visualization and interpretability.`,
		outcomes: [
			'Achieved ~83% AUC via cross-validated classification',
			'Built reproducible R workflows with GitHub version control',
			'Applied PCA and UMAP for cluster visualization of high-dimensional gene expression data'
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/rqian239/bioinformatics-project' },
            { label: 'Report (Google Docs)', url: 'https://docs.google.com/document/d/1H_WzE0txwWHN8vnuQCHgzM5h3a34JmQzCmN43IuIMxg/edit?tab=t.0#heading=h.n20rhmonrfx6' },
            { label: 'Presentation (Google Slides)', url: 'https://docs.google.com/presentation/d/18EJo9LPVhRuSxwOfjyw32d62_LEJOGSLHnHfXFVA5Wk/edit?usp=sharing' }
		]
	},
	{
		id: 'eeg_motor_research',
		name: 'EEG Functional Connectivity: Cooperative/Competitive Motor Tasks',
		stack: 'MATLAB · EEGLAB · SIFT · Bash · EEG · heart rate sensors · force sensors',
		desc: 'Functional connectivity analysis of EEG data during cooperative and competitive motor tasks (table tennis) at UF\'s Human Neuromechanics Lab.',
		category: 'Research / Data Science',
		status: 'Completed',
		date: 'August 2022 – August 2024',
		longDesc: `Conducted functional connectivity analysis of EEG data collected during cooperative and competitive motor tasks (specifically table tennis) at UF's Human Neuromechanics Laboratory. Analyzed interactions between sensorimotor and visual processing networks to generate insights into neural coordination, motor control, and decision-making. Designed data processing workflows for multimodal physiological data (EEG, heart rate, force sensors) and built biofeedback devices using Arduino and EMG/heart rate sensors for community outreach demonstrations.`,
		outcomes: [
			'Generated insights into sensorimotor/visual network coordination under competitive conditions',
			'Designed automated multimodal data processing pipelines (Bash + GitHub)',
			'Built Arduino-based EMG/heart rate biofeedback devices for public demonstrations'
		],
		links: []
	},
	{
		id: 'uf_team_formation_ml',
		name: 'ML-Optimized Student Team Formation (UF Engineering Education Research)',
		stack: 'Python · K-means clustering · pandas · survey data processing',
		desc: 'Modified K-means clustering model to optimize student team assignments in UF engineering courses. Increased classroom satisfaction by 30%.',
		category: 'Data Science / Software',
		status: 'In Progress',
		date: 'August 2023 – Present',
		longDesc: `Developed a modified K-means clustering model to optimize student team assignments in UF engineering courses using survey response data. The system ingests student survey data, cleans and processes it automatically, and outputs team groupings designed to maximize diversity and satisfaction. Also conducted statistical analysis on factors influencing student confidence and retention in engineering programs.`,
		outcomes: [
			'30% increase in classroom satisfaction from data-driven team groupings',
			'Automated data collection, cleaning, and processing pipelines',
			'Findings informed curriculum improvements and project-based workshop design',
			'Produced training materials and instructional videos for TA onboarding'
		],
		links: []
	},
	{
		id: 'baldi_handwriting',
		name: 'BALDI: Free-Space Handwriting Evaluation System',
		stack: 'Python · OpenCV · MediaPipe · TensorFlow · Keras · NiceGUI · FastAPI · DTW',
		desc: 'Educational free-space handwriting evaluation system using pinch gesture or IR stylus tracking, DTW template matching, and CNN classification.',
		category: 'Software / Computer Vision / Machine Learning',
		status: 'Completed',
		date: '2025 – 2026',
		longDesc: `BALDI is an educational free-space handwriting evaluation system that lets users "air-write" letters using either a hand pinch gesture (via MediaPipe hand landmarks) or an IR-tipped stylus tracked via background subtraction. Captured trajectories are normalized (resampled to 100 points, centered, unit-scaled, and PCA-rotated for full invariance) then evaluated against stored templates using Dynamic Time Warping (DTW) and/or a CNN image classifier. A NiceGUI web app provides live camera preview, confidence meter, top-3 predictions, and template recording.`,
		outcomes: [
			'Dual tracking modalities: RGB (MediaPipe) for accessibility + IR stylus for precision',
			'DTW template matching with exponential confidence scoring (score = exp(-2.0 * dtw_dist))',
			'CNN image classifier: trajectory rendered to 64×64 grayscale → 2D Conv stack → softmax over 26 letters',
			'PCA-based normalization pipeline: scale/translation/rotation invariant',
			'Pinch hysteresis system prevents jitter (enter=0.042, exit=0.062 normalized threshold)',
			'Synthetic font template generation from matplotlib TextPath for zero-sample baseline',
			'Separate crowdsource collector app for team-based training data collection'
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/AaryanAn/BALDI' },
             { label: 'Presentation (Google Slides)', url: 'https://docs.google.com/presentation/d/1UlxjqH60OKSlLVXjyVvgAeZdjClexNPi4gJrKc7libo/edit?usp=sharing' }
		]
	},
	{
		id: 'ignite_spell_caster',
		name: 'IGNITE: Interactive Magic Spell Caster',
		stack: 'Vanilla JS · TensorFlow.js · MediaPipe Hands · HTML5 Canvas · CSS3 · IndexedDB',
		desc: 'Harry Potter-themed spell-casting browser app. Draw shapes in the air to trigger particle animations. Fully client-side with in-browser CNN training for custom spells.',
		category: 'Software / Computer Vision / Machine Learning / Web',
		status: 'Completed',
		date: '2025 – 2026',
		longDesc: `IGNITE is a creative extension of the core trajectory tracking and gesture recognition technology built for BALDI. It ports BALDI's foundational pipeline — dual-modality tracking (MediaPipe hand landmarks + IR background subtraction), arc-length resampling, centroid normalization, DTW matching, and CNN inference — into a fully client-side browser application with no backend required. Built on top of that shared foundation, IGNITE layers on a Harry Potter-themed spell-casting experience where users draw shapes in the air (^ for Lumos, v for Nox, R for Revelio) to trigger immersive particle animations. It also extends BALDI's evaluation approach with in-browser TensorFlow.js CNN training, allowing users to define and train entirely custom spells at runtime.`,
		outcomes: [
			'Fully client-side: all tracking, inference, and training runs in-browser (no server)',
			'Dual recognizer: rule-based (instant, hardcoded spells) + 1D CNN (user-trainable custom spells)',
			'1D CNN: 3× Conv1D blocks (32→64→128 filters) + BatchNorm + GlobalAvgPool → Softmax',
			'Data augmentation: ±15% scale jitter, σ=0.03 noise, 50% time-reversal (4× per sample)',
			'Arc-length resampling to 64 points for drawing-speed invariance',
			'7 distinct particle effect types with per-particle gravity, velocity damping, lifetime decay',
			'Model persistence via IndexedDB; training data via localStorage'
		],
		links: [
            { label: 'Live Demo', url: 'https://bishyboi.github.io/IGNITE' },
			{ label: 'GitHub', url: 'https://github.com/bishyboi/IGNITE' },
            { label: 'Presentation (Google Slides)', url: 'https://docs.google.com/presentation/d/1UlxjqH60OKSlLVXjyVvgAeZdjClexNPi4gJrKc7libo/edit?usp=sharing' }
		]
	},
	{
		id: 'biomimetic_bird_robot',
		name: 'Biomimetic Bird Robot (BionicSwift-inspired)',
		stack: 'Arduino · Raspberry Pi · CAD · 3D printing · RC electronics · Python',
		desc: 'Led interdisciplinary team to design and prototype a biomimetic bird robot. Identified Nylon 66 as optimal filament via systematic material analysis.',
		category: 'Hardware / Robotics',
		status: 'In Progress',
		date: 'August 2022 – Present',
		longDesc: `Led an interdisciplinary team to design and prototype a biomimetic bird robot inspired by FESTO's BionicSwift. Responsibilities included CAD development, additive manufacturing workflow coordination, embedded hardware integration (Arduino/Raspberry Pi), and iterative flight testing. Conducted material analysis on structural filaments to optimize weight and structural performance.`,
		outcomes: [
			'Nylon 66 identified as optimal filament via systematic material performance analysis (flexural modulus, weight, cost)',
			'Integrated motors, cameras, and RC electronics for autonomous functionality',
			'Coordinated mechanical, aerospace, and materials engineering team members'
		],
		links: []
	},
	{
		id: 'bb8_robot',
		name: 'BB-8 Robotic Platform',
		stack: 'Arduino · Raspberry Pi · CAD · 3D printing · RC electronics · Python',
		desc: 'Designed and built a functional BB-8 inspired robotic platform as part of UF\'s Experimental 3D-Printing Design Team.',
		category: 'Hardware / Robotics',
		status: 'Completed',
		date: 'August 2022 – Present',
		longDesc: `Designed and built a functional BB-8 inspired robotic platform as part of UF's Experimental 3D-Printing Design Team. Coordinated CAD development, 3D printing of structural components, and integration of embedded electronics for locomotion and control.`,
		outcomes: [
			'Functional rolling BB-8 robot prototype',
			'Demonstrated embedded systems integration with 3D-printed mechanical structures'
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/bishyboi/bb8' }
		]
	},
	{
		id: 'openai_chatbot_hardware',
		name: 'Julito-D2: Embedded Voice-to-Voice AI Chatbot',
		stack: 'Python · OpenAI API · Raspberry Pi · TTS · audio hardware',
		desc: 'Deployed the OpenAI API on a Raspberry Pi to create an interactive physical chatbot with real-time voice responses.',
		category: 'Hardware / Software',
		status: 'Completed',
		date: '2023 – 2024',
		longDesc: `Deployed the OpenAI API on a Raspberry Pi embedded system to create an interactive physical chatbot capable of generating and speaking real-time audio responses. The device accepts voice or text input and produces synthesized spoken responses, demonstrating on-device AI inference integration with physical hardware.`,
		outcomes: [
			'Functional interactive physical AI chatbot',
			'Real-time audio response generation on embedded hardware'
		],
		links: [
			{ label: 'GitHub', url: 'https://github.com/bishyboi/Julito-D2' }
		]
	},
	{
		id: 'emg_biofeedback_device',
		name: 'Arduino EMG/Heart Rate Biofeedback Device',
		stack: 'Arduino · EMG sensors · heart rate sensors · real-time signal processing',
		desc: 'Interactive biofeedback device using Arduino and EMG/heart rate sensors for real-time physiological signal demonstrations at community outreach events.',
		category: 'Hardware / Research',
		status: 'Completed',
		date: '2022 – 2024',
		longDesc: `Developed an interactive biofeedback device using Arduino and EMG/heart rate sensors to demonstrate real-time physiological signal processing for community outreach settings. The device visualizes muscle activity and heart rate in real time, making physiology tangible and accessible for non-expert audiences.`,
		outcomes: [
			'Used in UF Human Neuromechanics Lab outreach events',
			'Demonstrates real-time EMG and heart rate signal processing on Arduino hardware'
		],
		links: []
	}
];
