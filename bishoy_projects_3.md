# Bishoy Pramanik — Complete Project List
> **Purpose**: This document is a structured reference for Claude Code and other AI tools. Each project includes a unique ID, category, description, tech stack, outcomes, and a link field (fill in as available).
> **Last updated**: May 2026

---

## HOW TO READ THIS DOCUMENT

Each entry follows this schema:
```
PROJECT_ID        : Unique short identifier (snake_case)
TITLE             : Full project name
CATEGORY          : [Research | Software | Publication | Hardware | Data Science | Web]
STATUS            : [Completed | In Progress | Published | In Review]
DATE              : Approximate timeframe
TECH_STACK        : Comma-separated list of tools/languages/frameworks
DESCRIPTION       : 2–4 sentence summary of what was built, why, and key results
OUTCOMES          : Bullet list of measurable or notable results
LINK              : URL or PLACEHOLDER
```

---

## ── RESEARCH & DATA SCIENCE PROJECTS ──

---

### PROJECT: mayo_autonomic_ml
```
PROJECT_ID   : mayo_autonomic_ml
TITLE        : Autonomic Dysfunction Phenotyping in Spinal Cord Injury (UMAP + Geodesic ML Pipeline)
CATEGORY     : Research / Data Science / Computational Geometry
STATUS       : In Progress (ongoing; formal report submitted for Computational Geometry course, April 2026)
DATE         : May 2024 – Present
TECH_STACK   : Python, PCA, K-means, UMAP (umap-learn), DBSCAN, HDBSCAN, TDA (Topological Data Analysis),
               scikit-learn, SciPy (Dijkstra / sparse graph), pandas, NumPy, pynndescent,
               relative neighborhood graphs, persistent homology (giotto-tda)
DESCRIPTION  : This project spans both ongoing Mayo Clinic research and a formal Computational Geometry
               course project (April 2026), applied to the same clinical dataset of 65 participants
               (32 controls, 27 SCI patients). The core problem is whether a topological manifold
               approach can identify stable, interpretable phenotypic clusters of autonomic dysfunction
               following spinal cord injury — and whether geodesic distances on the UMAP fuzzy
               simplicial set graph carry more clinically meaningful signal than raw Euclidean distance.
               The pipeline: group-wise median imputation and z-score normalization → UMAP dimensionality
               reduction (Manhattan metric) → clustering (KMeans, DBSCAN, HDBSCAN) → post-hoc validation
               against autonomic symptom scores (ADFSCI, COMPASS-31, UTI frequency, hospitalization rate).
               A full silhouette grid search over 1,664 hyperparameter combinations (n_neighbors × min_dist × k)
               identified optimal settings (k=4, n_neighbors=5, min_dist=0.0, silhouette=0.572). Geodesic
               distances were computed by converting UMAP edge weights to lengths via d = -log(w) and
               running Dijkstra's shortest-path algorithm, with an extension to graft unseen hypothetical
               patients onto the manifold without refitting. Literature review covered UMAP theory,
               persistent homology, and relative neighborhood graphs as a potential replacement for
               fixed-k nearest neighbor graph construction.
OUTCOMES     : - KMeans (k=4) produced an SCI-exclusive Cluster 0 (24/27 SCI) with highest dysfunction scores
                 (ADFSCI-total mean: 50.50 vs 9.56 for lowest-severity cluster)
               - Silhouette grid search over 1,664 combos; best: k=4, n_neighbors=5, min_dist=0.0, score=0.572
               - Euclidean centroid distances computed for all 4 clusters; geodesic distances finite only
                 between Clusters 1 and 2 (geodesic dist: 0.424); all others ∞ due to graph disconnection
               - Cluster 0 (SCI-only) most distant from Cluster 2 (Euclidean dist: 2.474)
               - Identified and formally documented silhouette circularity bias in hyperparameter selection
               - Implemented unseen-patient manifold grafting via pynndescent + Dijkstra extension
               - HDBSCAN: 2-cluster solution, mean ADFSCI-total 50.50 (SCI cluster) vs 17.63 (mixed cluster)
               - DBSCAN collapsed to single cluster — documented as density-boundary limitation
               - Informed prevention strategies for UTIs, pressure injuries, bowel dysfunction, autonomic dysreflexia
               - Formal 24-page written report with full theoretical background and experimental analysis
LINK         : https://drive.google.com/file/d/1Is7qNjDChzTrS04Ef8szCadFNy4k3jxv/view?usp=sharing 
```

---

### PROJECT: bwave_fmd_tool
```
PROJECT_ID   : bwave_fmd_tool
TITLE        : BWave.US — Open-Source Flow Mediated Dilation Assessment Tool
CATEGORY     : Research / Software
STATUS       : Published (medRxiv preprint, in review at journal)
DATE         : 2024 – 2025
TECH_STACK   : Python, OpenCV, SciPy, NumPy, pandas, image processing, signal processing
DESCRIPTION  : Developed BWave.US, a novel open-source software program for automated brachial artery edge
               detection in ultrasound video, designed to measure blood vessel diameter and quantify flow
               mediated dilation (FMD) — a biomarker for cardiovascular endothelial health. The tool was built
               to overcome the motion artifact and noise limitations of existing software (FloWave.US) and
               enable FMD measurement in clinical (non-lab) environments. Edge detection uses automated
               wall-tracking algorithms with region-of-interest locking across video frames.
OUTCOMES     : - Improved retained usable data significantly over FloWave.US in a diverse study population
               - Enabled FMD measurements in clinical settings without specialized lab equipment
               - Used in a published PM&R study correlating blood pressure instability with endothelial dysfunction
               - Presented at BMES 2024 Annual Meeting, Baltimore, MD
LINK         : https://github.com/bishyboi/BWave | medRxiv: https://doi.org/10.1101/2025.03.18.25324231
```

---

### PROJECT: mayo_patient_data_webapp
```
PROJECT_ID   : mayo_patient_data_webapp
TITLE        : Patient Data Analysis Web Application (Mayo Clinic)
CATEGORY     : Research / Software
STATUS       : Completed
DATE         : 2024 – Present
TECH_STACK   : Python, NiceGUI
DESCRIPTION  : Created a secure internal web application to interface clinical patient data with Python-based
               analysis pipelines at the Mayo Clinic. The app allows researchers to run analyses interactively
               while maintaining data confidentiality and workflow reproducibility. Designed to replace ad-hoc
               script execution with a structured, auditable interface.
OUTCOMES     : - Enabled efficient, reproducible research workflows for SCI patient data
               - Maintained data confidentiality and integrity standards required for clinical research
LINK         : PLACEHOLDER (internal tool, not public)
```

---

### PROJECT: scene_graph_generation
```
PROJECT_ID   : scene_graph_generation
TITLE        : Scene Graph Generation from Video (Data Science Research Laboratory, UF)
CATEGORY     : Research / Data Science
STATUS       : Completed
DATE         : August 2024 – December 2024
TECH_STACK   : Python, GroundingDINO, LLaVA, Llama, spatiotemporal feature engineering, pandas
DESCRIPTION  : Built a pipeline that integrates outputs from GroundingDINO (object detection) and LLaVA
               (vision-language model) to automatically generate structured subject-predicate-object relationship
               triples from video frames, transforming unstructured visual data into clean, analysis-ready
               scene graph datasets. Implemented spatiotemporal features using bounding-box distance metrics
               across frames to model dynamic object interactions. Evaluated on 500+ videos from the STAR dataset.
OUTCOMES     : - 46.9% improvement in precision over baseline models
               - 35.4% improvement in F1-score over baseline
               - Evaluated on 500+ video samples from STAR dataset
               - Presented at Projects in Data Science workshop, UF 2024
LINK         : https://drive.google.com/file/d/1bv_xDqrIXosyNBFrQru5BjAOIDl7DmT_/view?usp=sharing 
```

---

### PROJECT: schizophrenia_bioinformatics
```
PROJECT_ID   : schizophrenia_bioinformatics
TITLE        : Bioinformatic Analysis of Schizophrenia (RNA-seq + ML)
CATEGORY     : Research / Data Science
STATUS       : Completed
DATE         : August 2023 – December 2023
TECH_STACK   : R, DESeq2, tidyverse, caret, SVM, KNN, Naive Bayes, PCA, UMAP, ggplot2
DESCRIPTION  : Analyzed RNA-sequencing data from 55 patients (29K+ genes) to investigate gene expression
               patterns associated with schizophrenia. Built preprocessing and normalization workflows using
               DESeq2, then developed and cross-validated machine learning classifiers (SVM, KNN, Naive Bayes)
               to distinguish schizophrenia patients from controls. Applied dimensionality reduction (PCA, UMAP)
               for visualization and interpretability.
OUTCOMES     : - Achieved ~83% AUC via cross-validated classification
               - Built reproducible R workflows with GitHub version control
               - Applied PCA and UMAP for cluster visualization of high-dimensional gene expression data
LINK         : https://github.com/rqian239/bioinformatics-project | Report: https://docs.google.com/document/d/1H_WzE0txwWHN8vnuQCHgzM5h3a34JmQzCmN43IuIMxg/edit?tab=t.0#heading=h.n20rhmonrfx6 
```

---

### PROJECT: eeg_motor_research
```
PROJECT_ID   : eeg_motor_research
TITLE        : EEG Functional Connectivity Analysis — Cooperative/Competitive Motor Tasks
CATEGORY     : Research / Data Science
STATUS       : Completed
DATE         : August 2022 – August 2024
TECH_STACK   : MATLAB, EEGLAB, SIFT, Bash, GitHub, EEG, heart rate sensors, force sensors
DESCRIPTION  : Conducted functional connectivity analysis of EEG data collected during cooperative and
               competitive motor tasks (specifically table tennis) at UF's Human Neuromechanics Laboratory.
               Analyzed interactions between sensorimotor and visual processing networks to generate insights
               into neural coordination, motor control, and decision-making. Designed data processing workflows
               for multimodal physiological data (EEG, heart rate, force sensors) and built biofeedback
               devices using Arduino and EMG/heart rate sensors for community outreach demonstrations.
OUTCOMES     : - Generated insights into sensorimotor/visual network coordination under competitive conditions
               - Designed automated multimodal data processing pipelines (Bash + GitHub)
               - Built Arduino-based EMG/heart rate biofeedback devices for public demonstrations
LINK         : PLACEHOLDER
```

---

### PROJECT: uf_team_formation_ml
```
PROJECT_ID   : uf_team_formation_ml
TITLE        : ML-Optimized Student Team Formation (UF Engineering Education)
CATEGORY     : Data Science / Software
STATUS       : In Progress (ongoing role)
DATE         : August 2023 – Present
TECH_STACK   : Python, K-means clustering, pandas, survey data processing
DESCRIPTION  : Developed a modified K-means clustering model to optimize student team assignments in UF
               engineering courses using survey response data. The system ingests student survey data,
               cleans and processes it automatically, and outputs team groupings designed to maximize
               diversity and satisfaction. Also conducted statistical analysis on factors influencing
               student confidence and retention in engineering programs.
OUTCOMES     : - 30% increase in classroom satisfaction from data-driven team groupings
               - Automated data collection, cleaning, and processing pipelines
               - Findings informed curriculum improvements and project-based workshop design
               - Produced training materials and instructional videos for TA onboarding
LINK         : PLACEHOLDER
```

---

## ── SOFTWARE & WEB PROJECTS ──

---

### PROJECT: portfolio_website
```
PROJECT_ID   : portfolio_website
TITLE        : Technical Portfolio & Engineering Blog
CATEGORY     : Web / Software
STATUS       : Completed / Live
DATE         : 2024
TECH_STACK   : SvelteKit, Tailwind CSS, GitHub Actions, Markdown, Static Site Generation (SSG), GitHub Pages
DESCRIPTION  : Designed and deployed a personal technical portfolio and engineering blog using SvelteKit
               with Static Site Generation for fast load times and high availability. Integrated CI/CD
               via GitHub Actions for automated deployment to GitHub Pages. Built a dynamic routing system
               to render Markdown-based technical write-ups and project documentation.
OUTCOMES     : - Live personal portfolio site
               - Automated CI/CD pipeline via GitHub Actions
               - Dynamic Markdown rendering system for technical blog posts
LINK         : PLACEHOLDER (live site URL) | PLACEHOLDER (GitHub repo)
```

---

### PROJECT: baldi_handwriting
```
PROJECT_ID   : baldi_handwriting
TITLE        : BALDI — Free-Space Handwriting Evaluation System
CATEGORY     : Software / Computer Vision / Machine Learning
STATUS       : Completed (Senior Project)
DATE         : 2025–2026
TECH_STACK   : Python, OpenCV 4.13, MediaPipe 0.10.32, TensorFlow 2.20, Keras 3.13, NiceGUI 3.7.1,
               NumPy, SciPy, pandas, Pillow, Matplotlib, FastAPI, Quasar
DESCRIPTION  : BALDI is an educational free-space handwriting evaluation system that lets users "air-write"
               letters using either a hand pinch gesture (via MediaPipe hand landmarks) or an IR-tipped
               stylus tracked via background subtraction. Captured trajectories are normalized (resampled
               to 100 points, centered, unit-scaled, and PCA-rotated for full invariance) then evaluated
               against stored templates using Dynamic Time Warping (DTW) and/or a CNN image classifier.
               A NiceGUI web app provides live camera preview, confidence meter, top-3 predictions, and
               template recording. Long-term goal is a multi-writing-system language learning/practice tool.
OUTCOMES     : - Dual tracking modalities: RGB (MediaPipe) for accessibility + IR stylus for precision
               - DTW template matching with exponential confidence scoring (score = exp(-2.0 * dtw_dist))
               - CNN image classifier: trajectory rendered to 64×64 grayscale → 2D Conv stack → softmax over 26 letters
               - PCA-based normalization pipeline: scale/translation/rotation invariant
               - Pinch hysteresis system (enter=0.042, exit=0.062 normalized threshold) prevents jitter
               - Synthetic font template generation from matplotlib TextPath for zero-sample baseline
               - Separate crowdsource collector app for team-based training data collection
               - JSONL logging for per-stroke evaluation analysis
LINK         : https://github.com/AaryanAn/BALDI
```

---

### PROJECT: ignite_spell_caster
```
PROJECT_ID   : ignite_spell_caster
TITLE        : IGNITE — Interactive Magic Spell Caster
CATEGORY     : Software / Computer Vision / Machine Learning / Web
STATUS       : Completed (Senior Project)
DATE         : 2025–2026
TECH_STACK   : Vanilla JavaScript (ES6+), TensorFlow.js 4.22.0, MediaPipe Hands (CDN),
               HTML5 Canvas 2D, CSS3 (glassmorphism), localStorage, IndexedDB, Google Fonts (Cinzel, IM Fell English)
DESCRIPTION  : IGNITE is a creative extension of the core trajectory tracking and gesture recognition
               technology built for BALDI (see: baldi_handwriting). It ports BALDI's foundational
               pipeline — dual-modality tracking (MediaPipe hand landmarks + IR background subtraction),
               arc-length resampling, centroid normalization, DTW matching, and CNN inference — into a
               fully client-side browser application with no backend required. Built on top of that
               shared foundation, IGNITE layers on a Harry Potter-themed spell-casting experience where
               users draw shapes in the air (^ for Lumos, v for Nox, R for Revelio) to trigger immersive
               particle animations. It also extends BALDI's evaluation approach with in-browser
               TensorFlow.js CNN training, allowing users to define and train entirely custom spells at runtime.
OUTCOMES     : - Fully client-side: all tracking, inference, and training runs in-browser (no server)
               - Dual recognizer: rule-based (instant, hardcoded spells) + 1D CNN (user-trainable custom spells)
               - 1D CNN: 3× Conv1D blocks (32→64→128 filters) + BatchNorm + GlobalAvgPool → Softmax
               - Data augmentation: ±15% scale jitter, σ=0.03 noise, 50% time-reversal (4× per sample)
               - Arc-length resampling to 64 points for drawing-speed invariance
               - DTW with Sakoe-Chiba band (±20%) for template similarity
               - 7 distinct particle effect types with per-particle gravity, velocity damping, lifetime decay
               - Still-based draw toggle for IR wand: hold still ≥1 second to start/stop drawing
               - Model persistence via IndexedDB; training data via localStorage
               - Glassmorphism + Harry Potter aesthetic (Cinzel/IM Fell English fonts)
LINK         : https://github.com/bishyboi/IGNITE
```

---

## ── HARDWARE & EMBEDDED SYSTEMS PROJECTS ──

---

### PROJECT: biomimetic_bird_robot
```
PROJECT_ID   : biomimetic_bird_robot
TITLE        : Biomimetic Bird Robot (Inspired by FESTO BionicSwift)
CATEGORY     : Hardware / Robotics
STATUS       : In Progress (ongoing design team)
DATE         : August 2022 – Present
TECH_STACK   : Arduino, Raspberry Pi, CAD (3D modeling), 3D printing (nylon, glass fiber, carbon fiber), RC electronics, Python
DESCRIPTION  : Led an interdisciplinary team to design and prototype a biomimetic bird robot inspired by
               FESTO's BionicSwift. Responsibilities included CAD development, additive manufacturing
               workflow coordination, embedded hardware integration (Arduino/Raspberry Pi), and iterative
               flight testing. Conducted material analysis on structural filaments to optimize weight and
               structural performance. Identified Nylon 66 as the optimal filament for flight-capable
               structures based on flexural modulus, weight, and cost metrics.
OUTCOMES     : - Nylon 66 identified as optimal filament via systematic material performance analysis
               - Integrated motors, cameras, and RC electronics for autonomous functionality
               - Coordinated mechanical, aerospace, and materials engineering team members
LINK         : PLACEHOLDER
```

---

### PROJECT: bb8_robot
```
PROJECT_ID   : bb8_robot
TITLE        : BB-8 Robotic Platform
CATEGORY     : Hardware / Robotics
STATUS       : Completed
DATE         : August 2022 – Present (design team)
TECH_STACK   : Arduino, Raspberry Pi, CAD, 3D printing, RC electronics, Python
DESCRIPTION  : Designed and built a functional BB-8 inspired robotic platform as part of UF's Experimental
               3D-Printing Design Team. Coordinated CAD development, 3D printing of structural components,
               and integration of embedded electronics for locomotion and control.
OUTCOMES     : - Functional rolling BB-8 robot prototype
               - Demonstrated embedded systems integration with 3D-printed mechanical structures
LINK         : https://github.com/bishyboi/bb8
```

---

### PROJECT: openai_chatbot_hardware
```
PROJECT_ID   : openai_chatbot_hardware
TITLE        : Julito-D2 — Embedded Voice-to-Voice AI Chatbot (OpenAI API on Raspberry Pi)
CATEGORY     : Hardware / Software
STATUS       : Completed
DATE         : 2023–2024
TECH_STACK   : Python, OpenAI API, Raspberry Pi, text-to-speech (TTS), audio hardware
DESCRIPTION  : Deployed the OpenAI API on a Raspberry Pi embedded system to create an interactive
               physical chatbot capable of generating and speaking real-time audio responses. The device
               accepts voice or text input and produces synthesized spoken responses, demonstrating
               on-device AI inference integration with physical hardware.
OUTCOMES     : - Functional interactive physical AI chatbot
               - Real-time audio response generation on embedded hardware
LINK         : https://github.com/bishyboi/Julito-D2
```

---

### PROJECT: emg_biofeedback_device
```
PROJECT_ID   : emg_biofeedback_device
TITLE        : Arduino EMG/Heart Rate Biofeedback Device (Community Outreach)
CATEGORY     : Hardware / Research
STATUS       : Completed
DATE         : 2022–2024
TECH_STACK   : Arduino, EMG sensors, heart rate sensors, real-time signal processing
DESCRIPTION  : Developed an interactive biofeedback device using Arduino and EMG/heart rate sensors
               to demonstrate real-time physiological signal processing for community outreach settings.
               The device visualizes muscle activity and heart rate in real time, making physiology
               tangible and accessible for non-expert audiences.
OUTCOMES     : - Used in UF Human Neuromechanics Lab outreach events
               - Demonstrates real-time EMG and heart rate signal processing on Arduino hardware
LINK         : PLACEHOLDER
```

---

## ── PUBLICATIONS ──
> These are peer-reviewed or preprint research outputs. Marked separately from projects.

---

### PUBLICATION: pmr_autonomic_paper
```
PUBLICATION_ID : pmr_autonomic_paper
TITLE          : Increased symptomatic autonomic dysfunction is associated with greater cardiovascular
                 endothelial dysfunction following spinal cord injury
AUTHORS        : Pramanik B, Fernandez KA, Seidel-Miller K, Park A, Solinsky R
JOURNAL        : PM&R (Physical Medicine & Rehabilitation)
STATUS         : Published
DATE           : December 25, 2025 (Epub ahead of print)
DOI            : 10.1002/pmrj.70069
PMID           : 41447129
DESCRIPTION    : Case-control study evaluating the correlation between symptomatic blood pressure
                 instability (measured via ADFSCI survey) and objective vascular endothelial dysfunction
                 (measured via brachial flow mediated dilation / FMD ultrasound) in 24 SCI patients
                 vs 14 matched uninjured controls. Demonstrated a significant moderate correlation
                 (R²=0.24, p=0.03) between greater BP instability symptoms and greater vascular
                 dysfunction in SCI patients. BWave.US software was used for FMD measurements.
LINK           : https://doi.org/10.1002/pmrj.70069
```

---

### PUBLICATION: medrxiv_fmd_preprint
```
PUBLICATION_ID : medrxiv_fmd_preprint
TITLE          : A translational open-source flow mediated dilation assessment tool with improved
                 automated edge detection
AUTHORS        : Pramanik B, Veith D, Fernandez KA, Asp AJ, Solinsky R
JOURNAL        : medRxiv (preprint, in review)
STATUS         : In Review
DATE           : March 18, 2025
DOI            : 10.1101/2025.03.18.25324231
DESCRIPTION    : Describes the development and validation of BWave.US, a novel open-source FMD
                 measurement tool. Compares performance against FloWave.US, demonstrating significant
                 improvements in retained usable data across a diverse study population. Designed
                 to enable FMD measurements in clinical environments rather than constrained laboratory settings.
LINK           : https://doi.org/10.1101/2025.03.18.25324231
```

---

## ── ADDITIONAL PROJECTS (TO BE FILLED IN) ──
> Add personal/side projects below following the same schema. GitHub links for all projects above should also be added here or inline above.

```
PROJECT_ID   : [TO BE ADDED]
TITLE        : [TO BE ADDED]
CATEGORY     : [TO BE ADDED]
STATUS       : [TO BE ADDED]
DATE         : [TO BE ADDED]
TECH_STACK   : [TO BE ADDED]
DESCRIPTION  : [TO BE ADDED]
OUTCOMES     : [TO BE ADDED]
LINK         : [TO BE ADDED]
```

---

## QUICK REFERENCE INDEX

| ID | Title | Category | Status |
|---|---|---|---|
| mayo_autonomic_ml | Autonomic Dysfunction Phenotyping — UMAP + Geodesic ML | Research / Data Science / Comp. Geometry | In Progress |
| bwave_fmd_tool | BWave.US — FMD Assessment Tool | Research / Software | Published |
| mayo_patient_data_webapp | Patient Data Web App (Mayo) | Research / Software | Completed |
| scene_graph_generation | Scene Graph Generation from Video | Research / Data Science | Completed |
| schizophrenia_bioinformatics | Bioinformatic Analysis of Schizophrenia | Research / Data Science | Completed |
| eeg_motor_research | EEG Functional Connectivity (Motor Tasks) | Research / Data Science | Completed |
| uf_team_formation_ml | ML-Optimized Student Team Formation | Data Science / Software | In Progress |
| portfolio_website | Technical Portfolio & Engineering Blog | Web / Software | Live |
| baldi_handwriting | BALDI — Free-Space Handwriting Evaluation System | Software / CV / ML | Completed |
| ignite_spell_caster | IGNITE — Interactive Magic Spell Caster | Software / CV / ML / Web | Completed |
| biomimetic_bird_robot | Biomimetic Bird Robot (BionicSwift-inspired) | Hardware / Robotics | In Progress |
| bb8_robot | BB-8 Robotic Platform | Hardware / Robotics | Completed |
| openai_chatbot_hardware | Julito-D2 — Embedded Voice-to-Voice AI Chatbot | Hardware / Software | Completed |
| emg_biofeedback_device | EMG/Heart Rate Biofeedback Device | Hardware / Research | Completed |
| pmr_autonomic_paper | PM&R Publication — Autonomic Dysfunction & FMD | Publication | Published |
| medrxiv_fmd_preprint | medRxiv Preprint — BWave.US FMD Tool | Publication | In Review |
