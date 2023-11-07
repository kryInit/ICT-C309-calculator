grammar Expr;

expr
    : '(' expr ')'                                         # parenthesisExpr
    | 'if'        cond+=expr '{' expr '}'
     ('else' 'if' cond+=expr '{' expr '}')*
      'else'                 '{' expr '}'                  # ifExpr
    | Name=ID '(' expr? (',' expr)* ')'                    # functionExpr
    | Operator=('not' | '+' | '-') operand=expr            # unaryExpr
    | lhs=expr Operator=('*' | '/') rhs=expr               # binaryExpr
    | lhs=expr Operator=('+' | '-') rhs=expr               # binaryExpr
    | lhs=expr Operator=('<' | '<=' | '>' | '>=') rhs=expr # binaryExpr
    | lhs=expr Operator=('==' | '!=') rhs=expr             # binaryExpr
    | lhs=expr Operator='or' rhs=expr                      # binaryExpr
    | lhs=expr Operator='and' rhs=expr                     # binaryExpr
    | Float                                                # floatExpr
    | Int                                                  # intExpr
    ;

fragment Digit: [0-9];
fragment Digits: '0' | ([1-9] Digit*);
fragment Letter: [a-zA-Z_];

Int: Digits;
Float: Digits '.' Digits;
ID: Letter (Letter | [0-9])*;

WS: [ \t\n\r]+ -> skip;

// lexer errorではなくparser errorとしてcatchさせて楽をするため定義
ANY: .+?;

