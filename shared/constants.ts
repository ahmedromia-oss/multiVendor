export const enum Code {
  NO_CHANGED_VALUES = 'NO_CHANGED_VALUES',
  DELETED = 'DELETED',
  UN_AUTORIZED = 'UN_AUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  BAD_INPUT = 'BAD_INPUT',
  SUCCESS = 'SUCCESS',
  SMTH_WITH_DB = 'SMTH_WITH_DB',
  EMAIL_USED = 'EMAIL_USED',
}

export const enum valuesString {
  UPDATED = 'UPDATED',
}

export enum UserType {
  CLIENT = 'CLIENT',
  VENDOR = 'VENDOR',
  SUPER_ADMIN = 'SUPER_ADMIN',
}
export enum BorrowStatus {
  BORROWED = 'BORROWED',
  RETURNED = 'RETURNED',
  OVERDUE = 'OVERDUE',
}

export const enum ValidationErrors {
  NO_CHANGED_VALUES = 'NO_CHANGED_VALUES',
}
export enum CartStatus {
  ACTIVE = 'ACTIVE',
  COMPLETED = 'COMPLETED',
  ABANDONED = 'ABANDONED',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
}
export enum RESOLVER_TOKENS {
  IAdminResolver = 'IAdminResolver',
  IAuthResolver = 'IAuthResolver',
  ICartItemResolver = 'ICartItemResolver',
  ICartResolver = 'ICartResolver',
  IClientResolver = 'IClientResolver',
  IOrderResolver = 'IOrderResolver',
  IProductResolver = 'IProductResolver',
  IUserResolver = 'IUserResolver',
  IVendorResolver = 'IVendorResolver',
}
export enum REPOSITORY_TOKENS {
  IPaymentSessionRepository = 'IPaymentSessionRepository',
  IPaymentRepository = 'IPaymentRepository',
  IFollowRepository = 'IFollowRepository',
  IAdminRepository = 'IAdminRepository',
  IAuthRepository = 'IAuthRepository',
  ICartItemRepository = 'ICartItemRepository',
  ICartRepository = 'ICartRepository',
  IClientRepository = 'IClientRepository',
  IOrderRepository = 'IOrderRepository',
  IProductRepository = 'IProductRepository',
  IUserRepository = 'IUserRepository',
  IVendorRepository = 'IVendorRepository',
}
export enum SERVICE_TOKENS {
  IDataLoader = 'IDataLoader',
  INotificationService = 'INotificationService',
  IPaymentService = 'IPaymentService',
  IFollowService = 'IFollowService',
  IAdminService = 'IAdminService',
  IAuthService = 'IAuthService',
  ICartItemService = 'ICartItemService',
  ICartService = 'ICartService',
  IClientService = 'IClientService',
  IOrderService = 'IOrderService',
  IProductService = 'IProductService',
  IUserService = 'IUserService',
  IVendorService = 'IVendorService',
  IUnitOfWork = 'IUnitOfWork',
  IStripeService = 'IStripeService',
}
export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum ProviderType {
  STRIPE = 'STRIPE',
}
export enum OrderEvents {
  ORDER_PROCESSING = 'ORDER_PROCESSING',
  ORDER_SHIPPED = 'ORDER_SHIPPED',
  ORDER_DELIVERED = 'ORDER_DELIVERED',
  ORDER_CANCELLED = 'ORDER_CANCELLED',
}
