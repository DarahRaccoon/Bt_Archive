\NeedsTeXFormat{LaTeX2e} 
\ProvidesClass{Resume}
\LoadClass[a4paper,11pt]{report}

\RequirePackage[spanish,es-tabla]{babel}
\RequirePackage{fontspec}
\setmainfont{Libertinus Serif}

\RequirePackage{setspace}
\setlength{\parindent}{0pt}

\RequirePackage[top=2.5cm, bottom=2cm, left=2cm, right=2cm]{geometry}

\RequirePackage{multicol}
\setlength{\columnsep}{0.75cm}

\RequirePackage{enumitem}
\setlist[itemize]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}
\setlist[enumerate]{itemsep=2pt, topsep=4pt, parsep=2pt, partopsep=4pt}

\RequirePackage{fancyhdr}

\RequirePackage[bottom]{footmisc}

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
    font=small,
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

\RequirePackage[colorlinks=true, linkcolor=black, citecolor=blue, urlcolor=blue]{hyperref}

\bibliographystyle{naturemag}

\RequirePackage{lipsum}

\newcommand{\Portada}{
    \begin{titlepage}
    \centering
    {\includegraphics[width=0.4\textwidth]{/home/darah/Documentos/Uni/Plantilla/Logo_UPSIN.png} \par}
    \vspace{2cm}
    {\LARGE Universidad Politécnica de Sinaloa \par}
    \vspace{1cm}
    {\LARGE Licenciatura en Ingeniería en Biotecnología \par}
    \vfill
    {\Huge \Titulo \par}
    \vfill
    \end{titlepage}
    \newpage
}

\newcommand{\Indice}{
    \tableofcontents
    \thispagestyle{empty}
    \newpage
    \setcounter{page}{1}
}

\newcommand{\fancystyle}{
    \fancypagestyle{part}{
    \fancyhf{}
    \fancyhead[L]{\Titulo}
    \fancyhead[R]{\thepage}
    }

    \fancypagestyle{plain}{
    \fancyhf{}
    \fancyhead[L]{\Titulo}
    \fancyhead[R]{\thepage}
    }

    \pagestyle{fancy}
    \fancyhf{}
    \fancyhead[L]{\Titulo}
    \fancyhead[R]{\thepage}
}

\newcommand{\definition}[2]{
    \begin{tcolorbox}[toptitle=3pt,bottomtitle=3pt,title=\textbf{{#1}},top=5pt,bottom=5pt,arc=1mm]
        {#2}
    \end{tcolorbox}
}