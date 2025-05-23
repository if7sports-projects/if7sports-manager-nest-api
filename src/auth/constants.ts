export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'cambiar_por_algo_seguro',
  expiresIn: '1h',
};
