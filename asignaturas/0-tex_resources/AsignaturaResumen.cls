\NeedsTeXFormat{LaTeX2e} 
\ProvidesClass{AsignaturaResumen}
\LoadClass[a4paper,10pt,openany]{book}

% ---------------------------------------------------------------------------------------- %

\RequirePackage{simplelatex}

% Comando para guardado de PDF's: cp --parents ./*/*/0_Main.pdf /home/darah/Descargas/

    \appto\TPTnoteSettings{\scriptsize}

\RequirePackage[
    top=1.75cm,
    headsep=0.5cm,
    inner=1.25cm,
    marginparsep=0.75cm,
    marginparwidth=4.75cm,
    outer=6.5cm,
    bottom=3.25cm,
    footskip=1.5cm,
    columnsep=3em
]{geometry}

    \setmainfont{IBM Plex Serif}
    \setsansfont{IBM Plex Sans}
    \DeclareEmphSequence{\bfseries}
    \setlength{\parindent}{0pt}
    \setstretch{1.3}

\RequirePackage{multicol}

\let\oldpart\part
\renewcommand{\part}[1]{
    \cleardoublepage
    \newgeometry{top=2.5cm,bottom=2.5cm,inner=1.5cm,outer=1.5cm,footskip=1cm}
    \oldpart{#1}
    \restoregeometry
}

\RequirePackage{titlesec}
    \setcounter{secnumdepth}{3}
    \renewcommand{\thesection}{\arabic{section}}
    \titleformat{\section}{\sffamily\bfseries\large\MakeUppercase}{\thesection}{0em}{. }
    \titleformat{\subsection}{\sffamily\bfseries}{\thesubsection.}{0em}{. }
    \titleformat{\subsubsection}{\sffamily\itshape\small}{\thesubsubsection}{0em}{. }  

\RequirePackage{tocloft}
    \newlistof{definicion}{def}{Lista de definiciones}
    \newlistof{ejercicio}{ej}{Lista de ejercicios}
    \newlistof{dato}{dat}{Lista de datos biotecnológicos}

\RequirePackage[Glenn]{fncychap}
    \ChNameVar{\fontsize{16}{16}\selectfont}
    \ChNumVar{\fontsize{26}{26}\selectfont}
    \ChTitleVar{\fontsize{22}{22}\selectfont}

\RequirePackage{fancyhdr}
    \fancypagestyle{plain}{
        \fancyhf{} 
        \fancyhead{}
        \fancyfoot[LE,RO]{\thepage}
        \renewcommand{\headrulewidth}{0pt}
    }
    \pagestyle{fancy}
        \fancyhf{} 
        \fancyhead[LE]{\scriptsize\sffamily\MakeUppercase{Resumen de asignatura: \Titulo}}
        \fancyhead[RO]{\scriptsize\sffamily\leftmark}
        \fancyfoot[LE]{\thepage}
        \fancyfoot[RO]{\thepage}
        
        
\setlist[itemize]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}
\setlist[enumerate]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}

\captionsetup[table]{
    singlelinecheck=false,
    justification=raggedright,
    font=scriptsize,
    labelfont={sf,bf},
    skip=2pt
}
\captionsetup[figure]{
    skip=5pt,
    singlelinecheck=false,
    justification=raggedright,
    font=scriptsize,
    labelfont={sf,bf}
}
\captionsetup[subfigure]{
    skip=5pt,
    singlelinecheck=false,
    font=scriptsize,
    labelfont={sf,bf}
}
    

\RequirePackage{tikz}
    \usetikzlibrary{backgrounds, fit, calc, positioning, shapes.geometric, arrows, arrows.meta}
\RequirePackage{pgfplots}
    \pgfplotsset{compat=1.18}

\RequirePackage[most]{tcolorbox}

\RequirePackage[super,square,sort&compress,comma]{natbib}
    \bibliographystyle{unsrt}

\RequirePackage[colorlinks=true, citecolor=Blue, urlcolor=DarkBlue, linkcolor=black, hyperfootnotes=false]{hyperref}    

% --------------------------------------------------------------------------------------------------- %

\definecolor{Black}{RGB}{32,32,32}
\definecolor{Grey}{RGB}{247,247,247}
\definecolor{White}{RGB}{255,255,255}

\definecolor{DarkBlue}{RGB}{0,0,76}
\definecolor{Blue}{RGB}{0,160,224}
\definecolor{LightBlue}{RGB}{243,243,255}
\definecolor{DarkOrange}{RGB}{253,111,58}
\definecolor{DarkGreen}{RGB}{0,76,0}

    
\newcommand{\SetTitulo}[1]{\def\Titulo{#1}}
\newcommand{\Titulo}{}

\newcommand{\Portada}{
    \newgeometry{top=2.5cm,bottom=2.5cm,inner=1.5cm,outer=1.5cm,footskip=1cm}
    \begin{tikzpicture}[remember picture, overlay]
        \node[inner sep=0] at (current page.center) {\includegraphics[width=\paperwidth]{../portada}};
        %\fill[black, opacity=0.35] (current page.south west) rectangle (current page.north east);
        \node[anchor=north west, xshift=1.25cm, yshift=-1.25cm, scale=2] at (current page.north west) {\includegraphics[width=2.5cm]{../../0-tex_resources/logo_upsin.png}};
        \node[anchor=south west,xshift=0.75cm,yshift=8.25cm,font=\fontsize{36}{36}\selectfont,white,text width=15cm] at (current page.south west) {Resúmen de asignatura:};
        \fill[white] (-2,-19.05) rectangle (15.5,-19);
        \node[anchor=north west,xshift=0.75cm,yshift=7.25cm,font=\fontsize{42}{42}\selectfont\bfseries,white,text width=17cm,text badly ragged] at (current page.south west) {\Titulo};
        \node[anchor=south west,xshift=1.5cm,yshift=0.5cm,font=\fontsize{12}{12}\selectfont,white,text width=17cm] at (current page.south west) {Última actualización: \today};
    \end{tikzpicture}
    \pagestyle{empty}
    \cleardoublepage
}

\newcommand{\Indices}{
    \begin{multicols}{2}
        \printglossary
        \printglossary[title=Acrónimos,toctitle=Acrónimos,type=\acronymtype]
        \tableofcontents  \clearpage
        \listoffigures    \clearpage
        \listoftables     \clearpage
    \end{multicols}
    \input{../../0-tex_resources/secciones_complementarias} \clearpage
    \listofdefinicion \clearpage
    \listofejercicio  \clearpage
    \listofdato       \clearpage
    \pagestyle{fancy}
    \restoregeometry
}



\NewDocumentCommand{\resumebox}{s m m m}{
    % Configurar según color
    \ifstrequal{#2}{definicion}{
        \IfBooleanTF{#1}{
            \def\colframe{Black}\def\coltitle{Black}
            \def\colbacktitle{Grey}\def\colback{Grey}
            \def\coltext{Black}\def\tcoltitle{Definición}
        }{
            \stepcounter{definicion}
            \def\colframe{Black}\def\coltitle{Black}
            \def\colbacktitle{Grey}\def\colback{Grey}
            \def\coltext{Black}\def\tcoltitle{Definición \thechapter.\thedefinicion}
            \addcontentsline{def}{definicion}{\protect\numberline{\thechapter.\thedefinicion} #3}
        }
    }{}
    \ifstrequal{#2}{ejercicio}{
        \IfBooleanTF{#1}{
            \def\colframe{green!60!black}\def\coltitle{green!30!black}
            \def\colbacktitle{green!5!white}\def\colback{green!5!white}
            \def\coltext{green!10!black}\def\tcoltitle{Ejercicio}
        }{
            \stepcounter{ejercicio}
            \def\colframe{green!60!black}\def\coltitle{green!30!black}
            \def\colbacktitle{green!5!white}\def\colback{green!5!white}
            \def\coltext{green!10!black}\def\tcoltitle{Ejercicio \thechapter.\theejercicio}
            \addcontentsline{ej}{ejercicio}{\protect\numberline{\thechapter.\theejercicio} #3}
        }
    }{}
    \ifstrequal{#2}{dato}{
        \IfBooleanTF{#1}{
            \def\colframe{DarkBlue}\def\coltitle{DarkBlue}
            \def\colbacktitle{LightBlue}\def\colback{LightBlue}
            \def\coltext{DarkBlue}\def\tcoltitle{Dato biotecnologico}
        }{
            \stepcounter{dato}
            \def\colframe{DarkBlue}\def\coltitle{DarkBlue}
            \def\colbacktitle{LightBlue}\def\colback{LightBlue}
            \def\coltext{DarkBlue}\def\tcoltitle{Dato biotecnologico \thechapter.\thedato}
            \addcontentsline{dat}{dato}{\protect\numberline{\thechapter.\thedato} #3}
        }
    }{}
    \vspace{0.5em}
    \begin{tcolorbox}[
        toptitle=4pt,
        bottomtitle=4pt,
        top=4pt,
        bottom=4pt,
        arc=0mm,
        toprule=0pt,
        leftrule=2pt,
        rightrule=0pt,
        bottomrule=0pt,
        titlerule=1pt,
        colframe=\colframe, 
        coltitle=\coltitle,
        colbacktitle=\colbacktitle,
        colback=\colback,
        coltext=\coltext,
        title=\textbf{
            \tcoltitle: {#3}
        }
    ]{\small #4}%
    \end{tcolorbox}
}
    

\newcolumntype{M}[1]{>{\centering\arraybackslash}m{#1}}
\newcommand{\theader}[1]{\sffamily\bfseries{#1}}
\newcommand{\tmultiheader}[1]{\sffamily\bfseries\centering{#1}}