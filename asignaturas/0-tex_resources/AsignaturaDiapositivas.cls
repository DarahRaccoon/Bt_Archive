\NeedsTeXFormat{LaTeX2e}
\ProvidesClass{AsignaturaDiapositivas}
\LoadClass[10pt,aspectratio=169]{beamer}



\RequirePackage{simplelatex}

    \setsansfont{Argentum Sans}[
        UprightFont = ArgentumSans-Light,
        BoldFont = ArgentumSans-SemiBold,
        ItalicFont = ArgentumSans-LightItalic,
        BoldItalicFont = ArgentumSans-SemiBoldItalic
    ]   
    \setstretch{1}
    \setlength{\parskip}{5pt}

\RequirePackage{tikz}
    \usetikzlibrary{backgrounds, fit, calc, positioning, shapes.geometric, arrows, arrows.meta}
    
\RequirePackage{changepage}

\RequirePackage[super,square,sort&compress,comma]{natbib}
    \bibliographystyle{unsrt}


% ---------------------------------------------------------------------------------------- %

% Colores
    \definecolor{Black}{RGB}{32,32,32}
    \definecolor{Grey}{RGB}{251,250,249}
    \definecolor{White}{RGB}{255,255,255}
    \definecolor{DarkBlue}{RGB}{0,0,76}
    \definecolor{LightBlue}{RGB}{243,243,255}
    \definecolor{DarkOrange}{RGB}{253,111,58}
    \definecolor{DarkGreen}{RGB}{0,76,0}

    \setbeamercolor{background canvas}{bg=Grey}
    \setbeamercolor{headline}{fg=DarkBlue,bg=Grey}
    \setbeamercolor{section in head/foot}{fg=DarkBlue,bg=Grey}
    \setbeamercolor{page number in head/foot}{fg=White,bg=DarkBlue}
    \setbeamercolor{frametitle}{fg=DarkBlue,bg=Grey}

\setbeamersize{text margin left=1cm, text margin right=1cm}
\setbeamertemplate{navigation symbols}{}

\setbeamertemplate{headline}{
    \begin{beamercolorbox}[wd=\paperwidth,ht=2.75em,dp=1.25em,leftskip=0.025\paperwidth,rightskip=0.025\paperwidth]{headline}
        {\footnotesize\sffamily \textcolor{DarkBlue}{
            \textbf{\thesection. \insertsectionhead}
            \ifx\insertsubsectionhead\empty   \else \quad > \quad \insertsubsectionhead    \fi
            \ifx\insertsubsubsectionhead\empty\else \quad > \quad \insertsubsubsectionhead \fi
            }}
    \end{beamercolorbox}
    \rule{\paperwidth}{0.25pt}
}

\setbeamertemplate{frametitle}{
    \begin{beamercolorbox}[wd=\paperwidth,ht=0.5em,dp=0.25em,leftskip=0.04\paperwidth,rightskip=0.04\paperwidth]{frametitle}
        {\normalsize\sffamily\bfseries \insertframetitle}   
    \end{beamercolorbox}
}

\setbeamertemplate{footline}{\hfill
    \begin{beamercolorbox}[wd=0.1\paperwidth,ht=1.35em,dp=0.65em,center]{page number in head/foot}
        {\tiny\bfseries \insertframenumber \ / \pageref{TotPages}}
    \end{beamercolorbox}
    \vspace*{1em}
}


% ---------------------------------------------------------------------------------------- %

    \RequirePackage{hyperref}

% ---------------------------------------------------------------------------------------- %


\newcommand{\Titulo}{}
\newcommand{\SetTitulo}[1]{\def\Titulo{#1}}

\newcommand{\Portada}{
    \begin{frame}\thispagestyle{empty}
    \begin{tikzpicture}[remember picture, overlay]
        \node[inner sep=0] at (current page.center) {\includegraphics[width=\paperwidth]{../portada.jpg}};
        %\fill[black, opacity=0.5] (current page.south west) rectangle (current page.north east);
        \node[anchor=north west, inner sep=0, xshift=1cm, yshift=-0.75cm] at (current page.north west) {\includegraphics[width=2.5cm]{../../0-tex_resources/logo_upsin.png}};
        \node[anchor=west, xshift=1.08cm, yshift=2.25cm, white] at (current page.south west) {\Huge  \Titulo};
        \node[anchor=west, xshift=1.15cm, yshift=1.5cm,  white] at (current page.south west) {\large Universidad Politécnica de Sinaloa};
        \node[anchor=west, xshift=1.5cm,  yshift=0.4cm,  white] at (current page.south west) {\tiny  Última actualización: \today};
    \end{tikzpicture}
    \end{frame}
}