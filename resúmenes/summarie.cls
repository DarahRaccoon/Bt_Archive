\NeedsTeXFormat{LaTeX2e} 
\ProvidesClass{Resume}
\LoadClass[a4paper,11pt,openany]{book}



\RequirePackage[spanish,es-tabla,es-nodecimaldot]{babel}
\RequirePackage{ragged2e}
\RequirePackage{fontspec}
\setmainfont{IBM Plex Serif}

\RequirePackage{setspace}
\setlength{\parindent}{0pt}

\RequirePackage[
    top=2.5cm,
    bottom=2.5cm,
    inner=1.75cm,
    outer=1.75cm,
    footskip=1cm
]{geometry}

\RequirePackage{multicol}
\setlength{\columnsep}{0.75cm}

\RequirePackage{enumitem}
\setlist[itemize]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}
\setlist[enumerate]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}

\RequirePackage{fancyhdr}

\RequirePackage[bottom, multiple]{footmisc}



\RequirePackage{graphicx}
\RequirePackage{float}

\RequirePackage{subcaption}

\RequirePackage{array}
\RequirePackage{multirow}
\RequirePackage[para]{threeparttable}

\RequirePackage{etoolbox}
\appto\TPTnoteSettings{\scriptsize}

\captionsetup[table]{
    font=small,
    labelfont=bf,
    skip=2pt
}

\captionsetup[figure]{
    skip=5pt,
    font=scriptsize,
    labelfont=bf
}

\captionsetup[subfigure]{
    skip=5pt,
    font=scriptsize,
    labelfont=bf
}



\RequirePackage{amsmath}
\RequirePackage{chemfig}
\RequirePackage{chemobabel}

\RequirePackage{tikz,tcolorbox}
\RequirePackage{xcolor}


\RequirePackage[colorlinks=true, linkcolor=black, citecolor=blue, urlcolor=blue, hyperfootnotes=false]{hyperref}

\usepackage[superscript,biblabel]{cite}
\bibliographystyle{unsrt}



\RequirePackage{lipsum}


% --------------------------------------------------------------------------------------------------- %


\newcommand{\Portada}{
    \begin{titlepage}
    \centering
    {\includegraphics[width=0.4\textwidth]{/home/darah/Documentos/Uni/Plantilla/Logo_UPSIN.png} \par}
    \vspace{2cm}
    {\LARGE Universidad Politécnica de Sinaloa \par}
    \vspace{1cm}
    {\LARGE Licenciatura en Ingeniería en Biotecnología \par}
    \vfill
    {\LARGE Resumen de asignatura: \par}
    \vspace{1cm}
    {\Huge \Titulo \par}
    \vfill
    {\Large \today \par}
    \end{titlepage}
    \newpage
}

\newcommand{\NuevaPortada}{
    \begin{tikzpicture}[remember picture, overlay]
        \node[inner sep=0] at (current page.center) {\includegraphics[width=\paperwidth]{images/portada}};
        \fill[black, opacity=0.35] (current page.south west) rectangle (current page.north east);
        \node[anchor=north west, xshift=1.25cm, yshift=-1.25cm, scale=2] at (current page.north west) {\includegraphics[width=2.5cm]{../logo_upsin.png}};
        %\fill[anchor=south west, blue!20!black] (-2,-23.5) rectangle (16.5,-17.25); 
        \node[anchor=south west,xshift=0.75cm,yshift=8.25cm,font=\fontsize{36}{36}\selectfont,white,text width=15cm] at (current page.south west) {Resúmen de asignatura:};
        \fill[white] (-2,-19.05) rectangle (15.5,-19);
        \node[anchor=north west,xshift=0.75cm,yshift=7.25cm,font=\fontsize{42}{42}\selectfont\bfseries,white,text width=17cm,text badly ragged] at (current page.south west) {\Titulo};
        \node[anchor=south west,xshift=1.5cm,yshift=0.5cm,font=\fontsize{12}{12}\selectfont,white,text width=17cm] at (current page.south west) {Última actualización: \today};
    \end{tikzpicture}
}

\newcommand{\definition}[2]{
    \begin{tcolorbox}[
        toptitle=6pt,
        bottomtitle=6pt,
        top=6pt,
        bottom=6pt,
        arc=0mm,
        toprule=0pt,
        leftrule=2pt,
        rightrule=0pt,
        bottomrule=0pt,
        titlerule=1pt,
        colframe=black!80!white,
        coltitle=black,
        colbacktitle=black!10!white,
        colback=black!10!white,
        coltext=black,
        title=\textbf{Definición: {#1}}]{#2}
    \end{tcolorbox}
}

\newcommand{\cotidiana}[2]{
    \begin{tcolorbox}[
        toptitle=6pt,
        bottomtitle=6pt,
        top=6pt,
        bottom=6pt,
        arc=0mm,
        toprule=0pt,
        leftrule=2pt,
        rightrule=0pt,
        bottomrule=0pt,
        titlerule=1pt,
        colframe=blue!30!black,
        coltitle=blue!30!black,
        colbacktitle=blue!5!white,
        colback=blue!5!white,
        coltext=blue!10!black,
        title=\textbf{Biotecnología cotidiana: {#1}}
        ]
        {#2}
    \end{tcolorbox}
}

\newcommand{\desafiando}[2]{
    \begin{tcolorbox}[
        toptitle=6pt,
        bottomtitle=6pt,
        top=6pt,
        bottom=6pt,
        arc=0mm,
        toprule=0pt,
        leftrule=2pt,
        rightrule=0pt,
        bottomrule=0pt,
        titlerule=1pt,
        colframe=orange!95!black,
        coltitle=orange!90!black,
        colbacktitle=orange!5!white,
        colback=orange!5!white,
        coltext=orange!15!black,
        title=\textbf{Desafiando lo aprendido: {#1}}
        ]
        {#2}
    \end{tcolorbox}
}

\newcommand{\ejercicio}[2]{
    \begin{tcolorbox}[
        toptitle=6pt,
        bottomtitle=6pt,
        top=6pt,
        bottom=6pt,
        arc=0mm,
        toprule=0pt,
        leftrule=2pt,
        rightrule=0pt,
        bottomrule=0pt,
        titlerule=1pt,
        colframe=green!60!black,
        coltitle=green!30!black,
        colbacktitle=green!5!white,
        colback=green!5!white,
        coltext=green!10!black,
        title=\textbf{Ejercicio: {#1}}
        ]
        {#2}
    \end{tcolorbox}
}