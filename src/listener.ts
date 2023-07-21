import { FlatfileListener } from "@flatfile/listener";
import api from "@flatfile/api";

async function submit(jobId: string) {
  try {
    await api.jobs.ack(jobId, {
      info: "I'm starting the job - inside client",
      progress: 33,
    });
  } catch (e) {
    throw new Error(`Error acknowledging jobId: ${jobId} ${e}`);
  }

  // hit your api or webhook here
  await new Promise((res) => setTimeout(res, 2000));

  try {
    await api.jobs.complete(jobId, {
      info: "Job's work is done",
      outcome: { next: { type: "wait" } },
    });
  } catch (e) {
    throw new Error(`Error completing jobId: ${jobId} ${e}`);
  }
}

async function joinFields(jobId: string) {
  try {
    await api.jobs.ack(jobId, {
      info: "I'm starting the joining fields job",
    });
  } catch (e) {
    throw new Error(`Error acknowledging jobId: ${jobId} ${e}`);
  }

  try {
    const records = await api.records.get(sheetId);
    const recordsUpdates = records.data.records?.map((record) => {
      const fullName = `${record.values["first_name"].value} ${record.values["last_name"].value}`;
      record.values["full_name"].value = fullName;
      return record;
    });
    await api.records.update(sheetId, recordsUpdates as Flatfile.Record_[]);
  } catch (e) {
    throw new Error(`Error updating records`);
  }

  try {
    await api.jobs.complete(jobId, {
      info: "Job's work is done",
    });
  } catch (e) {
    throw new Error(`Error completing job: ${jobId}`);
  }
}

/**
 * Example Listener
 */
export const listener = FlatfileListener.create((client) => {
  client.on(
    "job:ready",
    // @ts-ignore
    { payload: { operation: "contacts:join-fields" } },
    async (event: any) => {
      const { context } = event;
      return joinFields(context.jobId);
    }
  );

  client.on(
    "job:ready",
    // @ts-ignore
    { payload: { operation: "contacts:submit" } },
    async (event: any) => {
      const { context } = event;
      return submit(context.jobId);
    }
  );
});
