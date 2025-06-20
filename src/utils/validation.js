export const validateName = (name) => {
    if (name.trim().length < 3) {
        return { isValid: false, error: "O nome deve ter pelo menos 3 caracteres." };
    }
    return { isValid: true, error: null};
};

export const validateEmail = (email) => {
    if (!/\S+@\S+\.\S+/.test(email)) {
        return { isValid: false, error: "Email inválido." };
    }
    return { isValid: true, error: null};
};

export const validateAge = (age) => {
    const numericAge = typeof age === 'string' ? parseInt(age) : age;
    if (isNaN (numericAge) || numericAge <= 0 || age > 90) {
        return { isValid: false, error: "Idade deve ser um número entre 1 e 90" };
    }
    return { isValid: true, error: null};
};