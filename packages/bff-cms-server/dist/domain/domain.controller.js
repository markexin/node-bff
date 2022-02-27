"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DomainController = void 0;
const common_1 = require("@nestjs/common");
const domain_service_1 = require("./domain.service");
const domain_model_1 = require("./domain.model");
let DomainController = class DomainController {
    constructor(service) {
        this.service = service;
    }
    async search() {
        return await this.service.getDomainList();
    }
    async add(createDomainDto) {
        return await this.service.addDomain(createDomainDto);
    }
    async edit() {
        console.log(1111);
    }
    async delete() {
        console.log(1111);
    }
};
__decorate([
    (0, common_1.Get)('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "search", null);
__decorate([
    (0, common_1.Post)('add'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [domain_model_1.Domain]),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "add", null);
__decorate([
    (0, common_1.Put)('edit'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "edit", null);
__decorate([
    (0, common_1.Delete)('delete'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DomainController.prototype, "delete", null);
DomainController = __decorate([
    (0, common_1.Controller)('domain'),
    __metadata("design:paramtypes", [domain_service_1.DomainService])
], DomainController);
exports.DomainController = DomainController;
//# sourceMappingURL=domain.controller.js.map