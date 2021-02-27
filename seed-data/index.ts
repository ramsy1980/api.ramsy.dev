import capcodes from './capcodes';
import safetyRegions from './safetyregions';

export async function insertSeedData(ks: any): Promise<void> {
  // Keystone API changed, so we need to check for both versions to get keystone
  const keystone = ks.keystone || ks;
  const adapter = keystone.adapters?.MongooseAdapter || keystone.adapter;
  const { mongoose } = adapter;

  console.log(`🌱 Inserting Seed Data:`);

  for (const capcode of capcodes) {
    console.log(`   ☑️ Adding CapCode: ${capcode.code}`);

    delete capcode._id;
    await mongoose.model('CapCode').create(capcode);
  }

  console.log(`✅ Seed Data Inserted ...`);
  console.log('👋 Please start the process with `yarn dev` or `npm run dev`');
  process.exit();
}
