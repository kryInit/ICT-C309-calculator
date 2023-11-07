grammar CondExpr;

expression: expr EOF;

expr
    : '(' expr ')'                                         # parenthesis
    | 'if'        cond+=expr '{' expr '}'
     ('else' 'if' cond+=expr '{' expr '}')*
      'else'                 '{' expr '}'                  # ifExpression
    | Operator=('not' | '+' | '-') operand=expr            # unaryOperation
    | lhs=expr Operator=('*' | '/') rhs=expr               # binaryOperation
    | lhs=expr Operator=('+' | '-') rhs=expr               # binaryOperation
    | lhs=expr Operator=('<' | '<=' | '>' | '>=') rhs=expr # binaryOperation
    | lhs=expr Operator=('==' | '!=') rhs=expr             # binaryOperation
    | lhs=expr Operator='or' rhs=expr                      # binaryOperation
    | lhs=expr Operator='and' rhs=expr                     # binaryOperation
    | Float                                                # float
    | Int                                                  # int
    | ID                                                   # identifier
    ;

fragment Digit: [0-9];
fragment Digits: '0' | ([1-9] Digit*);
fragment Letter: [a-zA-Z_];

Int: Digits;
Float: Digits '.' Digits;
ID: Letter (Letter | [0-9])*;

WS: [ \t\n\r]+ -> skip;
SL_COMMENT: '//' .*? '\n' -> skip;
BLOCK_COMMENT: '/*' .*? '*/' -> skip;

// lexer errorではなくparser errorとしてcatchさせて楽をするため定義
ANY: .+?;

