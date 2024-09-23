%{
    const {Arithmetic,ArithmeticType} = require('../interpreter/Expression/Arithmetic')
    const {Literal,LiteralType} = require('../interpreter/Expression/Literal')
    const {Declaration} = require('../interpreter/Instruction/Declaration')
    const {Print} = require('../interpreter/Instruction/Print')
    const {Access} = require('../interpreter/Expression/Access')
    const {Function} = require('../interpreter/Instruction/Function')
    const {Statement} = require('../interpreter/Instruction/Statement')
    const {LlamadaFuncion} = require('../interpreter/Instruction/LlamadaFuncion')
%}

%lex

%options case-sensitive

%%

\s+											// se ignoran espacios en blanco
"//".*										// comentario simple línea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario multiple líneas

//palabras reservadas

"true"                  return 'TRUE';
"false"                 return 'FALSE';
"print"                 return 'PRINT';
"function"              return 'FUNCTION'

//'dijofdjf'+${}'
[0-9]+("."[0-9]+)?\b  	return 'ENTERO';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';

"("                     return 'PAR_ABRE';
")"                     return 'PAR_CIERRA';

"{"                     return 'LLAVE_ABRE';
"}"                     return 'LLAVE_CIERRA';


//logicos
"=="                    return 'D_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
"="                    return 'IGUAL';
//*/

','                     return 'COMA'
";"                    return 'PUNTO_Y_COMA';
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';

\"[^\"]*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'[^\']*\'				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
<<EOF>>				    return 'EOF';
.					   {console.log(yylloc.first_line, yylloc.first_column,'Lexico',yytext)}
/lex


%left 'INTERROGACION' 'DOS_PUNTOS'
%left 'OR'
%left 'AND'
%left 'DIFERENTE' 'D_IGUAL'
%left 'MENOR_IGUAL' 'MAYOR_IGUAL' 'MENOR' 'MAYOR'
%left 'MAS' 'MENOS' 
%left 'POR' 'DIVIDIR'
%left UMENOS
%right 'NOT' 



%start ini

%% 

ini
	: instructions EOF{
		return $1;
	}
;

instructions
    : instructions beggining
        {$1.push($2); $$=$1;}
    | beggining
    {$$=[$1]}
;

beggining
    :declaration
    |print
    |function
    |llamadaFuncion
;

declaration
    :IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA
        {$$ = new Declaration($1, $3 ,@1.first_line, @1.first_column)}    
;


print
    :PRINT PAR_ABRE ExprList PAR_CIERRA PUNTO_Y_COMA
    {$$ = new Print($3,@1.first_line, @1.first_column)}    
;

statement
    : LLAVE_ABRE instructions LLAVE_CIERRA { $$ = new Statement($2, @1.first_line, @1.first_column)}
    | LLAVE_ABRE LLAVE_CIERRA {$$ = new Statement([], @1.first_line, @1.first_column)}
;

function
    :FUNCTION IDENTIFICADOR PAR_ABRE PAR_CIERRA statement
        {$$ = new Function($2, $5, [],  @1.first_line, @1.first_column)}
    |FUNCTION IDENTIFICADOR PAR_ABRE parametros PAR_CIERRA statement
        {$$ = new Function($2, $6, $4,  @1.first_line, @1.first_column)}
;

parametros
    : parametros COMA IDENTIFICADOR
        {$1.push($3); $$ = $1;}
    |IDENTIFICADOR
        {$$ = [$1]}
;

llamadaFuncion
    : IDENTIFICADOR PAR_ABRE PAR_CIERRA PUNTO_Y_COMA
    { $$ = new LlamadaFuncion($1, [],  @1.first_line, @1.first_column)}
    | IDENTIFICADOR PAR_ABRE ExprList PAR_CIERRA PUNTO_Y_COMA
    { $$ = new LlamadaFuncion($1, $3,  @1.first_line, @1.first_column)}
;


ExprList
    :ExprList COMA expresion
     {$1.push($3); $$=$1;}
    |expresion
    {$$=[$1]}
;


//EXPRESION

expresion
    :MENOS expresion %prec UMENOS		{$$= new Arithmetic($2,new Literal("-1",LiteralType.NUMBER, @1.first_line, @1.first_column),ArithmeticType.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion MAS expresion            {$$= new Arithmetic($1,$3,ArithmeticType.SUMA, @1.first_line, @1.first_column)} 
    |expresion MENOS expresion          {$$= new Arithmetic($1,$3,ArithmeticType.RESTA, @1.first_line, @1.first_column)} 
    |expresion POR expresion            {$$= new Arithmetic($1,$3,ArithmeticType.MULTIPLICACION, @1.first_line, @1.first_column)}   
    |expresion DIVIDIR expresion        {$$= new Arithmetic($1,$3,ArithmeticType.DIVISION, @1.first_line, @1.first_column)} 
    |PAR_ABRE expresion PAR_CIERRA      {$$= $2}
	|ENTERO	                            {$$= new Literal($1,LiteralType.NUMBER, @1.first_line, @1.first_column)}							
	|CADENA                             {$$= new Literal($1,LiteralType.STRING, @1.first_line, @1.first_column)}        					
    |TRUE                               {$$= new Literal($1,LiteralType.BOOL, @1.first_line, @1.first_column)}                              
    |FALSE                              {$$= new Literal($1,LiteralType.BOOL, @1.first_line, @1.first_column)} 
    |IDENTIFICADOR                      {$$= new Access($1,@1.first_line, @1.first_column)}
;