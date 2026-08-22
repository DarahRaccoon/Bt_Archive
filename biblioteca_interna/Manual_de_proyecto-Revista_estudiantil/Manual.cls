\NeedsTeXFormat{LaTeX2e} 
\ProvidesClass{BTMag}
\LoadClass[a4paper,12pt,openany]{book}

% ---------------------------------------------------------------------------------------- %

\patchcmd{\@makechapterhead}{\normalfont}{\normalfont\sffamily}{}{}    

\RequirePackage[spanish,es-tabla,es-nodecimaldot]{babel}
\RequirePackage{fontspec}
    \setmainfont{Crimson}
    \setsansfont{Red Hat Display}
    
\RequirePackage[
    top=2.25cm,
    headsep=0.75cm,
    bottom=2.5cm,
    footskip=1cm,
    left=2cm,
    right=2cm,
    columnsep=0.65cm
]{geometry}

\RequirePackage{multicol}

\RequirePackage{setspace}
    \setlength{\parindent}{0pt}
    \setstretch{1.15}

\RequirePackage{simplelatex}


\RequirePackage{titlesec}
    \setcounter{secnumdepth}{3}
    \renewcommand{\thesection}{\arabic{section}}
    \titleformat{\chapter}{\sffamily\bfseries\Huge\MakeUppercase}{}{0em}{}[\rule{\linewidth}{0.5pt}\vspace*{-1em}]
    \titleformat{\section}{\sffamily\bfseries\large\MakeUppercase}{\thesection}{0.5em}{}
    \titleformat{\subsection}{\sffamily\bfseries}{\thesubsection.}{0.5em}{}
    \titleformat{\subsubsection}{\sffamily\itshape\small}{\thesubsubsection}{0.5em}{}  

\RequirePackage{fancyhdr}
    \fancypagestyle{plain}{
        \fancyhf{}
        \renewcommand{\headrulewidth}{0pt}
        \fancyfoot[LE,RO]{\thepage}
        }
    \pagestyle{fancy}
        \fancyhf{} 
        \fancyhead[LE]{\sffamily\selectfont Manual de proyecto}
        \fancyhead[RO]{\sffamily\bfseries\selectfont \textcolor{Primario}{\Proyecto}}
        \fancyfoot[LE]{\thepage}
        \fancyfoot[RO]{\thepage}


\setlist[itemize]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}
\setlist[enumerate]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}

\captionsetup[table]{singlelinecheck=false,justification=raggedright,font=scriptsize,labelfont={sf,bf,color=Primario},skip=2pt}
\captionsetup[figure]{skip=5pt,singlelinecheck=false,justification=raggedright,font=scriptsize,labelfont={sf,bf,color=Primario}}
\captionsetup[subfigure]{skip=5pt,singlelinecheck=false,justification=raggedright,font=scriptsize,labelfont={sf,bf,color=Primario}}


\RequirePackage{tikz}
\RequirePackage{tcolorbox}

\RequirePackage{chapterbib}
\RequirePackage[square]{natbib}
    \bibliographystyle{apalike-ejor}
    
\RequirePackage[colorlinks=true, linkcolor=Secundario, citecolor=Secundario, urlcolor=Primario, hyperfootnotes=false]{hyperref}

% --------------------------------------------------------------------------------------------------- %

\definecolor{Grey}{RGB}{242,242,242}
\definecolor{White}{RGB}{255,255,255}

\newcommand{\SetProyecto}[1]{\def\Proyecto{#1}
    \ifstrequal{#1}{Club Ambiental}
        {
        \definecolor{Primario}{RGB}{16,64,27}
        \definecolor{Secundario}{RGB}{159,197,90}
        \definecolor{Acento}{RGB}{230,255,186}
        }
    {\ifstrequal{#1}{Revista Universitaria}
        {
        \definecolor{Primario}{RGB}{9,60,113}
        \definecolor{Secundario}{RGB}{0,160,224}
        \definecolor{Acento}{RGB}{138,222,255}
        \definecolor{Complemento}{RGB}{245,230,80}
        }
    }
}
\newcommand{\Proyecto}{}

\newcommand{\Portada}{
    \begin{tikzpicture}[remember picture, overlay]
        \node[inner sep=0] at (current page.center) {\includegraphics[width=\paperwidth]{Portada}};
        \fill[black, opacity=0.35] (current page.south west) rectangle (current page.north east);
        \node[anchor=north west,xshift=1cm,yshift=-1cm] at (current page.north west) {\includegraphics[width=6cm]{../Recursos/Logo_UPSIN_Horizontal_Blanco}};
        \node[anchor=south west,xshift=0.75cm,yshift=7.5cm,font=\fontsize{36}{36}\selectfont,white,text width=15cm] at (current page.south west) {Manual de Proyecto:};
        \draw[white] (-2,-20) -- (15,-20);
        \node[anchor=north west,xshift=0.75cm,yshift=6.5cm,font=\sffamily\fontsize{42}{42}\selectfont\bfseries,white,text width=17cm,text badly ragged] at (current page.south west) {\Proyecto};
        \node[anchor=south west,xshift=1.5cm,yshift=0.5cm,font=\fontsize{12}{12}\selectfont,white,text width=17cm] at (current page.south west) {Última actualización: \today};
    \end{tikzpicture}
    \newpage
}

\newcommand{\Indices}{
    \makeatletter
        \renewcommand{\@pnumwidth}{1em}
        \renewcommand{\@dotsep}{4}
    \makeatother
    \begingroup
        \hypersetup{linkcolor=black}
        \thispagestyle{empty}
        \sffamily
        \renewcommand{\contentsname}{\sffamily{Índice}}
        \renewcommand{\listtablename}{\sffamily{Tablas}}
        \renewcommand{\listfigurename}{\sffamily{Figuras}}
        \sffamily
            \tableofcontents
            \listoftables
            \listoffigures
    \endgroup
}

\newcolumntype{M}[1]{>{\centering\arraybackslash}m{#1}}

\newcommand{\theader}[1]{
    \sffamily\bfseries\cellcolor{Primario}\textcolor{White}{#1}
}

\newcommand{\tmultiheader}[1]{
    \sffamily\bfseries\centering\textcolor{Primario}{#1}
}