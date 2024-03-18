const roles = {
     pharmacy:"PHARMACY",
     customer:"CUSTOMER"
}

const codes = {
     'INT_SERVER_ERR':500 ,
     'BAD_REQUEST':401,
     'SUCCESS':200,
     'AUTH_MISS':402,
     'UNAUTHORIZED':405,
     'TOKEN_EXP':403,
     'NOT_FOUND': 404,
     'MISSING_FIELDS':400
}

module.exports = {
     roles,
     codes
}