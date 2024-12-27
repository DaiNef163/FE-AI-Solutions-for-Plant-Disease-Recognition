import React from "react";

function IntroductionAI() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative py-12">
      {/* Tech leaf background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url('/api/placeholder/800/800')`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '40%',
          opacity: 0.05
        }}
      />

      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          AI Chẩn Đoán Bệnh Lá Cây
        </h1>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 space-y-8">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Tổng Quan</h2>
            <p className="text-gray-700 leading-relaxed">
              Dự án này sử dụng trí tuệ nhân tạo (AI) để chẩn đoán bệnh lá cây thông qua phân tích ảnh. 
              Mô hình xử lý các bộ dữ liệu ảnh lá cây để nhận diện và phân loại các bệnh với độ chính xác cao, 
              hỗ trợ nông nghiệp thông minh. Sử dụng mô hình CNN để xây dựng mô hình.
            </p>
            <img
              src="https://i.ytimg.com/vi/RRhGRSsiKxQ/maxresdefault.jpg"
              alt="Ảnh minh họa AI phân tích lá cây"
              className="mt-6 w-full rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            />
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Các Bước Chính</h2>
            <ol className="space-y-6">
              {[
                {
                  title: "Chuẩn bị dữ liệu",
                  content: "Ảnh được tăng cường dữ liệu, và chia thành hai tập: huấn luyện và xác thực."
                },
                {
                  title: "Xây dựng mô hình",
                  content: "Sử dụng mạng nơ-ron tích chập (CNN) với các lớp Conv2D, MaxPooling, Dropout, và Dense để xây dựng một mô hình hiệu quả và chính xác."
                },
                {
                  title: "Huấn luyện",
                  content: "Huấn luyện mô hình qua nhiều vòng (epochs) bằng bộ tối ưu Adam và hàm mất mát categorical crossentropy."
                },
                {
                  title: "Đánh giá qua số liệu",
                  content: "Đánh giá hiệu suất qua số liệu bằng độ chính xác và hàm mất mát."
                },
                {
                  title: "Lưu mô hình",
                  content: "Lưu mô hình dưới dạng .h5 và kết quả của mô hình dưới dạng json"
                },
                {
                  title: "Đánh giá qua mô hình",
                  content: "Đánh giá hiệu suất bằng độ chính xác và hàm mất mát, đồng thời trực quan hóa qua biểu đồ."
                }
              ].map((step, index) => (
                <li key={index} className="bg-white/50 rounded-lg p-6 shadow hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                      {index + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-lg text-purple-800 mb-2">{step.title}</h3>
                      <p className="text-gray-700">{step.content}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Công Nghệ Sử Dụng</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {["TensorFlow/Keras để xây dựng và huấn luyện mô hình", "Matplotlib để trực quan hóa dữ liệu"].map((tech, index) => (
                <div key={index} className="bg-white/50 p-4 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
                  <p className="text-gray-700">{tech}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-purple-800">Lợi Ích</h2>
            <div className="bg-white/50 p-6 rounded-lg shadow hover:shadow-md transition-shadow duration-300">
              <p className="text-gray-700 leading-relaxed">
                Bằng cách tự động hóa việc chẩn đoán bệnh, mô hình AI này giúp nông dân đưa ra quyết định 
                kịp thời, giảm tổn thất mùa màng và tối ưu hóa việc sử dụng thuốc trừ sâu.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default IntroductionAI;