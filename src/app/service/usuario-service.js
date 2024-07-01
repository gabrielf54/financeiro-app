import ApiService from "../api-service";

class UsuarioService extends ApiService {
    constructor() {
        super('/api/usuarios');
    }
}

export default UsuarioService;