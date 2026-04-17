
// 3 roles Admin/Vendor/Customer, 10 Vendors with profiles, 100 Produces

import { PrismaClient, Role, CertificationStatus, ProduceCategory } from '@prisma/client';
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';
import process from 'process';

const prisma = new PrismaClient();

const BCRYPT_SALT_ROUNDS = 10;

const PRODUCE_CATEGORIES = Object.values(ProduceCategory);
const CERT_STATUSES: CertificationStatus[] = ['APPROVED', 'PENDING', 'REJECTED'];

async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
}

async function main() {
  console.log(' Starting database seed...');

  // Clean existing data 
  await prisma.plantTracking.deleteMany();
  await prisma.sustainabilityCert.deleteMany();
  await prisma.communityPost.deleteMany();
  await prisma.order.deleteMany();
  await prisma.produce.deleteMany();
  await prisma.rentalSpace.deleteMany();
  await prisma.vendorProfile.deleteMany();
  await prisma.user.deleteMany();
  console.log('✅ Cleaned existing data');

  // Admin
  const adminUser = await prisma.user.create({
    data: {
      name: 'Platform Admin',
      email: 'admin@urbanfarming.com',
      password: await hashPassword('Admin@1234'),
      role: Role.ADMIN,
      status: 'ACTIVE',
    },
  });
  console.log(`Admin created: ${adminUser.email}`);

  //  Demo Customer 
  const demoCustomer = await prisma.user.create({
    data: {
      name: 'Demo Customer',
      email: 'customer@urbanfarming.com',
      password: await hashPassword('Customer@1234'),
      role: Role.CUSTOMER,
      status: 'ACTIVE',
    },
  });

  // 10 Vendors with Profiles 
  const vendors: { userId: string; profileId: string }[] = [];

  for (let i = 0; i < 10; i++) {
    const vendorUser = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email({ provider: 'urbanfarm.com' }),
        password: await hashPassword('Vendor@1234'),
        role: Role.VENDOR,
        status: 'ACTIVE',
      },
    });

    const certStatus = faker.helpers.arrayElement(CERT_STATUSES);

    const profile = await prisma.vendorProfile.create({
      data: {
        userId: vendorUser.id,
        farmName: faker.company.name() + ' Farm',
        farmLocation: faker.location.city() + ', ' + faker.location.state(),
        farmDescription: faker.lorem.sentences(2),
        certificationStatus: certStatus,
      },
    });

    // Create a SustainabilityCert for each vendor
    await prisma.sustainabilityCert.create({
      data: {
        vendorId: profile.id,
        certifyingAgency: faker.helpers.arrayElement([
          'USDA Organic',
          'EU Organic',
          'Rainforest Alliance',
          'Fair Trade Certified',
          'Non-GMO Project',
        ]),
        certificationDate: faker.date.past({ years: 2 }),
        expiryDate: faker.date.future({ years: 2 }),
        certificationStatus: certStatus,
        adminNotes: certStatus === 'REJECTED' ? faker.lorem.sentence() : null,
      },
    });

    // Create 1–3 RentalSpaces per vendor
    const numSpaces = faker.number.int({ min: 1, max: 3 });
    const rentalSpaceIds: string[] = [];
    for (let r = 0; r < numSpaces; r++) {
      const space = await prisma.rentalSpace.create({
        data: {
          vendorId: profile.id,
          location: faker.location.streetAddress(),
          size: faker.helpers.arrayElement(['5sqm', '10sqm', '20sqm', '50sqm']),
          price: parseFloat(faker.commerce.price({ min: 20, max: 200 })),
          availability: faker.datatype.boolean(0.7),
          description: faker.lorem.sentence(),
        },
      });
      rentalSpaceIds.push(space.id);
    }

    vendors.push({ userId: vendorUser.id, profileId: profile.id });
    console.log(`Vendor ${i + 1}/10: ${vendorUser.email} — Profile: ${profile.farmName}`);
  }

  //100 Produce Items
  const produceNames: Record<ProduceCategory, string[]> = {
    VEGETABLES: ['Tomato', 'Spinach', 'Kale', 'Lettuce', 'Carrot', 'Broccoli', 'Cucumber', 'Bell Pepper'],
    FRUITS: ['Strawberry', 'Blueberry', 'Lemon', 'Apple', 'Mango', 'Avocado', 'Watermelon'],
    HERBS: ['Basil', 'Mint', 'Rosemary', 'Thyme', 'Parsley', 'Cilantro', 'Oregano'],
    SEEDS: ['Sunflower Seeds', 'Pumpkin Seeds', 'Tomato Seeds', 'Herb Seed Mix', 'Wildflower Seeds'],
    TOOLS: ['Trowel Set', 'Garden Gloves', 'Watering Can', 'Pruning Shears', 'Soil pH Tester'],
    OTHER: ['Compost Bag', 'Organic Fertilizer', 'Peat Moss', 'Mulch Bag'],
  };

  const allProduceIds: string[] = [];

  for (let i = 0; i < 100; i++) {
    const vendor = faker.helpers.arrayElement(vendors);
    const category = faker.helpers.arrayElement(PRODUCE_CATEGORIES);
    const names = produceNames[category];
    const baseName = faker.helpers.arrayElement(names);

    const produce = await prisma.produce.create({
      data: {
        vendorId: vendor.profileId,
        name: `${faker.word.adjective()} ${baseName}`,
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price({ min: 2, max: 150 })),
        category,
        certificationStatus: faker.helpers.arrayElement(CERT_STATUSES),
        availableQuantity: faker.number.int({ min: 0, max: 500 }),
        isActive: faker.datatype.boolean(0.85),
      },
    });
    allProduceIds.push(produce.id);
  }
  console.log(' 100 Produce items seeded');

  // 20 Community Posts 
  const allUserIds = [adminUser.id, demoCustomer.id, ...vendors.map((v) => v.userId)];
  for (let i = 0; i < 20; i++) {
    await prisma.communityPost.create({
      data: {
        userId: faker.helpers.arrayElement(allUserIds),
        title: faker.lorem.sentence({ min: 4, max: 8 }),
        postContent: faker.lorem.paragraphs(2),
        tags: faker.helpers.arrayElements(
          ['organic', 'tips', 'harvest', 'composting', 'soil', 'watering', 'pests', 'seeds'],
          { min: 1, max: 4 }
        ),
      },
    });
  }
  console.log(' 20 Community posts seeded');

  //  15 Sample Orders 
  for (let i = 0; i < 15; i++) {
    const vendorIndex = faker.number.int({ min: 0, max: vendors.length - 1 });
    const vendor = vendors[vendorIndex];
    const produce = await prisma.produce.findFirst({
      where: { vendorId: vendor.profileId },
    });
    if (!produce) continue;

    const qty = faker.number.int({ min: 1, max: 10 });
    await prisma.order.create({
      data: {
        userId: demoCustomer.id,
        produceId: produce.id,
        vendorId: vendor.profileId,
        quantity: qty,
        totalPrice: parseFloat((Number(produce.price) * qty).toFixed(2)),
        status: faker.helpers.arrayElement(['PENDING', 'CONFIRMED', 'SHIPPED', 'DELIVERED', 'CANCELLED']),
      },
    });
  }
  console.log(' 15 Orders seeded');

  //  Plant Tracking
  const allRentalSpaces = await prisma.rentalSpace.findMany({ take: 10 });
  for (let i = 0; i < 8; i++) {
    if (!allRentalSpaces[i]) continue;
    await prisma.plantTracking.create({
      data: {
        userId: demoCustomer.id,
        rentalSpaceId: allRentalSpaces[i % allRentalSpaces.length].id,
        plantName: faker.helpers.arrayElement(['Tomato', 'Basil', 'Lettuce', 'Mint', 'Pepper']),
        status: faker.helpers.arrayElement(['SEEDLING', 'GROWING', 'FLOWERING', 'FRUITING', 'HARVESTING']),
        healthNotes: faker.lorem.sentence(),
        plantedDate: faker.date.past({ years: 0.5 }),
      },
    });
  }
  console.log(' Plant trackings seeded');

  console.log(' Seed complete! Login credentials:');
  console.log('   Admin    → admin@urbanfarming.com    / Admin@1234');
  console.log('   Customer → customer@urbanfarming.com / Customer@1234');
  console.log('   Vendors  → (see DB) password: Vendor@1234');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });