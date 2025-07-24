export default function Metrics() {
  const dummyMetrics = [
    {
      title: "Total",
      caption: "Jumlah catatan yang dibuat oleh Member",
      number: 4,
    },
    {
      title: "Diajukan",
      caption: "Jumlah yang perlu direview oleh Leader",
      number: 1,
    },
    {
      title: "Dijadwalkan",
      caption: "Jumlah yang sudah dijadwalkan",
      number: 1,
    },
    {
      title: "Terselesaikan",
      caption: "Jumlah yang sudah terselesaikan",
      number: 2,
    },
    {
      title: "Ditolak",
      caption: "Jumlah yang ditolak oleh Leader",
      number: 1,
    },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5 md:gap-4">
      { dummyMetrics.map((item, index)=>{
        return(
          <div key={index} className="rounded-2xl border border-gray-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
            <div className="grid grid-cols-12 items-center">
              <div className="col-span-11">
                <span className="text-2xl text-gray-600 dark:text-gray-400">
                  {item.title}
                </span>
                <div>
                  <span
                    style={{ fontSize: "11px" }}
                    className="mt-2 text-gray-600 dark:text-white/90"
                  >
                    {item.caption}
                  </span>
                </div>
              </div>
              <div className="col-span-1">
                <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
                  {item.number}
                </h4>
              </div>
            </div>
          </div>

        )
      })}

      {/* <!-- Rank A--> */}
      {/* <div className="rounded-2xl border border-red-300 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-11">
            <span className="text-2xl text-red-500 dark:text-gray-400">
              RANK A
            </span>
            <div>
              <span
                style={{ fontSize: "11px" }}
                className="mt-2 text-gray-600 dark:text-white/90"
              >
                Jumlah Hyarihatto dengan score 19 - 25
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
              0
            </h4>
          </div>
        </div>
      </div> */}

      {/* <!-- Rank B--> */}

      {/* <div className="rounded-2xl border border-orange-400 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-11">
            <span className="text-2xl text-orange-500 dark:text-gray-400">
              RANK B
            </span>
            <div>
              <span
                style={{ fontSize: "11px" }}
                className="mt-2 text-gray-600 dark:text-white/90"
              >
                Jumlah Hyarihatto dengan score 10 - 18
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
              1
            </h4>
          </div>
        </div>
      </div> */}

      {/* <!-- Rank C--> */}
      {/* <div className="rounded-2xl border border-yellow-400 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-11">
            <span className="text-2xl text-yellow-600 dark:text-gray-400">
              Rank C
            </span>
            <div>
              <span
                style={{ fontSize: "11px" }}
                className="mt-2 text-gray-600 dark:text-white/90"
              >
                Jumlah Hyarihatto dengan score 6 - 9
              </span>
            </div>
          </div>
          <div className="col-span-1">
            <h4 className="font-bold text-gray-800 text-4xl dark:text-white/90">
              3
            </h4>
          </div>
        </div>
      </div> */}
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
