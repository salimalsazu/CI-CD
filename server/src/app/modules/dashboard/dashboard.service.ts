import prisma from '../../../shared/prisma';

// !----------------------------------get all counts---------------------------------------->>>
const getTotalCount = async () => {
  const result = await prisma.$transaction(async transactionClient => {
    //
    const totalUsers = await transactionClient.user.count({
      where: {
        profile: {
          role: {
            equals: 'USER',
          },
        },
      },
    });

    // ! total products
    const totalProducts = await transactionClient.product.count();
    // ! total orders
    const totalOrders = await transactionClient.order.count();
    // ! total
    const totalCategory = await transactionClient.category.count();

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalCategory,
    };
  });
  return result;
};

export const DashboardService = {
  getTotalCount,
};
