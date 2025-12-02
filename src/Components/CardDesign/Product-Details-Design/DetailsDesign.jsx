import { BsFillStarFill } from "react-icons/bs";
import useAuthInfo from "../../Hooks/useAuthInfo";
import useAxios from "../../Hooks/useAxios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Loading from "../../Loading/Loading";
import { FaTimes, FaUserCircle } from "react-icons/fa";

const DetailsDesign = ({
  pictureURL,
  sellerName,
  sellerEmail,
  description,
  toyName,
  subCategory,
  rating,
  price,
  availableQuantity,
}) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [commentText, setCommentText] = useState("");

  const axios = useAxios();
  const { user } = useAuthInfo();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/product-comments/${id}`)
      .then((res) => {
        setComments(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err.message));
  }, [id, axios]);

  const handleCommentSubmit = () => {
    if (!user?.email) {
      alert("You must be logged in to comment");
      return;
    }

    if (!commentText.trim()) return;

    axios
      .post("/product-comments", {
        productId: id,
        email: user.email,
        comments: commentText,
        photoURL: user.photoURL,
      })
      .then(() => {
        setComments((prev) => [
          {
            email: user.email,
            comments: commentText,
            photoURL: user.photoURL,
            createdAt: new Date(),
          },
          ...prev,
        ]);
        setCommentText("");
        setShowModal(false);
      })
      .catch((err) => console.log(err.message));
  };

  if (loading) return <Loading />;

  return (
    // MAIN CONTAINER: Added max-width and padding for overall page responsiveness
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      {/* GRID LAYOUT: Stacks on mobile, 2 columns on Large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        
        {/* --- Left Section (Image & Seller) --- */}
        <section className="flex flex-col">
          {/* Image Container: Centered and responsive width */}
          <div className="w-full flex justify-center items-center bg-gray-50 rounded-xl p-4 md:p-8">
            <img
              src={pictureURL}
              alt={toyName}
              // Image is 100% width of container but capped at max-width sizes
              className="w-full max-w-[300px] md:max-w-sm lg:max-w-md h-auto object-cover rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          <div className="seller-info mt-6 md:mt-8 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <h3 className="font-bold text-gray-700 mb-2 border-b border-blue-200 pb-2">Seller Information</h3>
            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm md:text-base text-gray-600">
              <p><span className="font-semibold text-gray-800">Name:</span> {sellerName}</p>
              <p><span className="font-semibold text-gray-800">Email:</span> {sellerEmail}</p>
            </div>
          </div>

          <div className="describe-sec mt-6">
            <p className="text-lg font-bold text-gray-800 border-l-4 border-[#0F83B2] pl-3">Product Details</p>
            <p className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed text-justify">
              {description}
            </p>
          </div>
        </section>

        {/* --- Right Section (Info & Comments) --- */}
        <section className="flex flex-col space-y-4 md:space-y-6">
          <div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">{toyName}</h3>
            <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded mt-2">
              {subCategory}
            </span>
          </div>

          <div className="space-y-2 text-base md:text-lg">
            <p className="flex items-center gap-2">
              <span className="font-semibold">Rating:</span> 
              <span className="flex items-center bg-yellow-100 px-2 py-0.5 rounded text-yellow-700 font-bold text-sm">
                {rating} <BsFillStarFill className="text-yellow-500 ml-1" />
              </span>
            </p>
            <p className="text-2xl font-bold text-[#0F83B2]">
              ${price}
            </p>
            <p className="text-gray-600 text-sm">
              In Stock: <span className="font-medium text-gray-900">{availableQuantity} pcs</span>
            </p>
          </div>

          <button
            // Button is full width on mobile, auto on desktop
            className="w-full sm:w-auto btn bg-[#0F83B2] hover:bg-[#0b658a] text-white font-semibold px-8 py-3 rounded-lg shadow-md transition-all"
            onClick={() => setShowModal(true)}
          >
            Write a Review
          </button>

          {/* Comments Section */}
          <div className="mt-8 border-t pt-6">
            <h4 className="font-bold text-lg mb-4 text-gray-800">Customer Reviews ({comments.length})</h4>
            
            <div className="bg-white rounded-lg border border-gray-200 p-2 md:p-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-gray-400 italic">
                  No reviews yet. Be the first to share your thoughts!
                </div>
              ) : (
                <ul className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {comments.map((c, idx) => (
                    <li
                      key={idx}
                      className="p-3 md:p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition border border-transparent hover:border-gray-200"
                    >
                      <div className="flex gap-3 items-start">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                          {c.photoURL ? (
                            <img
                              src={c.photoURL}
                              alt="user"
                              className="w-10 h-10 rounded-full object-cover border border-white shadow-sm"
                              onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'block'; }}
                            />
                          ) : null}
                          <FaUserCircle className="w-10 h-10 text-gray-300" style={{ display: c.photoURL ? 'none' : 'block' }} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-1">
                            <p className="font-bold text-sm text-gray-900 truncate">{c.email}</p>
                            <p className="text-xs text-gray-400">
                              {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : ''}
                            </p>
                          </div>
                          <p className="text-gray-700 text-sm leading-relaxed break-words">
                            {c.comments}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Modal - Responsive Overlay */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6 relative shadow-2xl animate-fadeIn">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
              onClick={() => setShowModal(false)}
            >
              <FaTimes size={20} />
            </button>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Add a Comment</h2>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-[#0F83B2] focus:border-transparent outline-none transition"
              rows={5}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your experience with this product..."
            />
            <div className="flex justify-end gap-3">
                <button 
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition"
                >
                    Cancel
                </button>
                <button
                className="bg-[#0F83B2] hover:bg-[#0b658a] text-white px-6 py-2 rounded-lg font-bold shadow-md transition"
                onClick={handleCommentSubmit}
                >
                Post Comment
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsDesign;